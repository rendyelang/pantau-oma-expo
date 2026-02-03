import * as Notifications from "expo-notifications";

// 1. Configure Handler: How notifications behave when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// 2. Helper to Request Permissions
export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }
}

// 3. Helper to Trigger Immediate Notification
export async function sendDangerNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "EMERGENCY ALERT! ⚠️",
      body: "Your mom has fallen! Check the app immediately.",
      sound: true, // Default sound
      data: { data: "danger" },
    },
    trigger: null, // null means trigger immediately
  });
}
