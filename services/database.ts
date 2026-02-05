import * as Network from "expo-network";
import * as SQLite from "expo-sqlite";
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";

const DATABASE_NAME = "pantauoma.db";

export interface EmergencyContact {
  id: string; // 'oma' or 'ambulance'
  name: string;
  phone: string;
}

let dbInstance: SQLite.SQLiteDatabase | null = null;

const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = await SQLite.openDatabaseAsync(DATABASE_NAME);
  return dbInstance;
};

export const initDatabase = async () => {
  try {
    const database = await getDB();
    await database.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
      );
    `);
    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export const saveContact = async (id: string, name: string, phone: string) => {
  try {
    const database = await getDB();
    await database.runAsync("INSERT OR REPLACE INTO contacts (id, name, phone) VALUES (?, ?, ?)", id, name, phone);
    console.log(`Saved contact ${id} locally`);

    // Try to sync if online
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected && networkState.isInternetReachable) {
      await syncContactToFirebase(id, name, phone);
    }
  } catch (error) {
    console.error("Error saving contact:", error);
    throw error;
  }
};

export const getContacts = async (): Promise<EmergencyContact[]> => {
  try {
    const database = await getDB();
    const result = await database.getAllAsync<EmergencyContact>("SELECT * FROM contacts");
    return result;
  } catch (error) {
    console.error("Error getting contacts:", error);
    return [];
  }
};

export const syncContactToFirebase = async (id: string, name: string, phone: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in, skipping Firebase sync");
      return;
    }

    await setDoc(doc(db, "users", user.uid, "contacts", id), {
      name,
      phone,
      updatedAt: new Date().toISOString(),
    });
    console.log(`Synced ${id} to Firebase`);
  } catch (e) {
    console.error("Error syncing to firebase", e);
  }
};

export const clearContacts = async () => {
  try {
    const database = await getDB();
    await database.runAsync("DELETE FROM contacts");
    console.log("Cleared local contacts");
  } catch (error) {
    console.error("Error clearing contacts:", error);
  }
};

export const restoreContactsFromFirebase = async (userId: string) => {
  try {
    console.log(`Restoring contacts for ${userId}...`);
    const querySnapshot = await getDocs(collection(db, "users", userId, "contacts"));

    if (querySnapshot.empty) {
      console.log("No remote contacts found to restore.");
      return;
    }

    const database = await getDB();

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const id = doc.id;
      const { name, phone } = data;

      if (name && phone) {
        await database.runAsync("INSERT OR REPLACE INTO contacts (id, name, phone) VALUES (?, ?, ?)", id, name, phone);
        console.log(`Restored contact ${id} from cloud`);
      }
    }
  } catch (error) {
    console.error("Error restoring contacts from cloud:", error);
  }
};

export interface HistoryEvent {
  id?: string;
  type: "DANGER" | "FALL" | "BATTERY" | "CONNECTION" | "SAFE";
  title: string;
  description: string;
  timestamp: any; // Firestore Timestamp
}

export const logHistoryEvent = async (userId: string, event: Omit<HistoryEvent, "id" | "timestamp">) => {
  try {
    await addDoc(collection(db, "users", userId, "history"), {
      ...event,
      timestamp: serverTimestamp(),
    });
    console.log(`Logged event: ${event.type}`);
  } catch (error) {
    console.error("Error logging history event:", error);
  }
};

export const getHistory = async (userId: string): Promise<HistoryEvent[]> => {
  try {
    const q = query(collection(db, "users", userId, "history"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as HistoryEvent);
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};
