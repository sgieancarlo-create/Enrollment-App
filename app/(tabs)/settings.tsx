import { useRouter } from 'expo-router';
import { Alert, Button, Text, View } from 'react-native';
import { mockAuth } from '../../src/config/mockAuth.ts'; // Import mockAuth
import { useAuth } from '../../src/context/AuthProvider.tsx';

export default function SettingsScreen() {
  const { currentUser, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const handleClearAll = async () => {
    try {
      await mockAuth.clearAll(); // Clears all users and sessions
      Alert.alert('Success', 'All users and sessions cleared!');
    } catch (error) {
      console.error('Failed to clear users:', error);
      Alert.alert('Error', 'Failed to clear users.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Settings</Text>
      <Text style={{ marginBottom: 20 }}>Email: {currentUser?.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <View style={{ height: 10 }} /> {/* Spacer */}
      <Button title="Clear All Users" color="red" onPress={handleClearAll} />
    </View>
  );
}
