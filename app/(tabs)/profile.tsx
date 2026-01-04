import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/context/AuthProvider';

export default function ProfileScreen() {
  const { user, updateProfile, updatePassword } = useAuth();
  
  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  // Update local name state when user changes
  useEffect(() => {
    if (user?.name !== undefined) {
      setName(user.name);
    }
  }, [user?.name]);
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleSaveProfile = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty');
      return;
    }

    setIsUpdatingProfile(true);
    try {
      console.log('[ProfileScreen] Starting profile update...');
      await updateProfile({ name: name.trim() });
      console.log('[ProfileScreen] Profile update successful, showing alert');
      Alert.alert('Success', 'Profile updated successfully!');
      console.log('[ProfileScreen] Alert shown');
    } catch (error) {
      console.error('[ProfileScreen] Profile update error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword) {
      Alert.alert('Validation Error', 'Please enter your current password');
      return;
    }

    if (!newPassword) {
      Alert.alert('Validation Error', 'Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Validation Error', 'New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updatePassword(currentPassword, newPassword);
      Alert.alert('Success', 'Password changed successfully!');
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password update error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your account information</Text>
      </View>

      {/* Profile Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={user?.email || ''}
              editable={false}
              placeholderTextColor="#95a5a6"
            />
            <Text style={styles.helperText}>Email cannot be changed</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#95a5a6"
              editable={!isUpdatingProfile}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, isUpdatingProfile && styles.buttonDisabled]}
            onPress={handleSaveProfile}
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Change Password Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        
        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#95a5a6"
              secureTextEntry
              editable={!isUpdatingPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password (min 6 characters)"
              placeholderTextColor="#95a5a6"
              secureTextEntry
              editable={!isUpdatingPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#95a5a6"
              secureTextEntry
              editable={!isUpdatingPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, isUpdatingPassword && styles.buttonDisabled]}
            onPress={handleChangePassword}
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Change Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{user?.uid || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Type:</Text>
            <Text style={styles.infoValue}>Standard User</Text>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  inputDisabled: {
    backgroundColor: '#ecf0f1',
    color: '#7f8c8d',
  },
  helperText: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonPrimary: {
    backgroundColor: '#3498db',
  },
  buttonSecondary: {
    backgroundColor: '#e74c3c',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#7f8c8d',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  divider: {
    height: 1,
    backgroundColor: '#ecf0f1',
  },
});
