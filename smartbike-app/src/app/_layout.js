import { Stack } from "expo-router/stack";
import { MqttProvider } from "../context/MqttContext";

export default function Layout() {
  return (
    <MqttProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </MqttProvider>
  );
}
