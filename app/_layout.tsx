import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthProvider';
import { ThemeProvider } from '../src/context/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
