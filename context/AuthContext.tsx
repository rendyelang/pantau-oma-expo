import { auth } from "@/lib/firebaseConfig";
import { clearContacts, restoreContactsFromFirebase } from "@/services/database";
import { useRouter, useSegments } from "expo-router";
import { signOut as firebaseSignOut, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
  reloadUser: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Restore contacts from cloud whenever a user logs in (or session is restored)
        await restoreContactsFromFirebase(user.uid);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // If not logged in and not in auth group, redirect to login
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // If logged in and in auth group, redirect to home
      router.replace("/(tabs)");
    }
  }, [user, isLoading, segments]);

  const signOut = async () => {
    try {
      await clearContacts(); // Clear local data on logout
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const reloadUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      // Force a new object reference to trigger re-render
      setUser({ ...auth.currentUser } as User);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return <AuthContext.Provider value={{ user, isLoading, signOut, reloadUser }}>{children}</AuthContext.Provider>;
}
