import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockAuth } from '../../src/config/mockAuth';

export default function DebugClearScreen() {
  const handleClearAll = async () => {
    try {
      await mockAuth.clearAll();
      await AsyncStorage.clear();
      Alert.alert('Success', 'All data cleared! Redirecting to login...');
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to clear data: ' + error);
    }
  };

  const handleCheckStorage = async () => {
    try {
      const users = await AsyncStorage.getItem('@mockAuth:users');
      const currentUser = await AsyncStorage.getItem('@mockAuth:currentUser');
      Alert.alert(
        'Storage Contents',
        `Users: ${users || 'empty'}\n\nCurrent User: ${currentUser || 'empty'}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to check storage: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Tools</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleClearAll}>
        <Text style={styles.buttonText}>Clear All Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleCheckStorage}>
        <Text style={styles.buttonText}>Check Storage</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.tertiaryButton]} 
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    maxWidth: 300,
  },
  secondaryButton: {
    backgroundColor: '#3498db',
  },
  tertiaryButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
