import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PasswordStrengthIndicator } from '../../components/PasswordStrengthIndicator';
import { useAuth } from '../../src/context/AuthProvider';
import { useThemeColors } from '../../src/context/ThemeProvider';

export default function ProfileScreen() {
  const { user, updateProfile, updatePassword, updateProfilePicture, removeProfilePicture } = useAuth();
  const colors = useThemeColors();
  
  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
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

  // Request permissions for image picker
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload a profile picture.');
        return false;
      }
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsUploadingImage(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        await updateProfilePicture(imageUri);
        Alert.alert('Success', 'Profile picture updated successfully!');
      }
    } catch (error) {
      console.error('[ProfileScreen] Image picker error:', error);
      Alert.alert('Error', 'Failed to upload profile picture');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeProfilePicture();
              Alert.alert('Success', 'Profile picture removed');
            } catch (error) {
              console.error('[ProfileScreen] Remove image error:', error);
              Alert.alert('Error', 'Failed to remove profile picture');
            }
          },
        },
      ]
    );
  };

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

  const styles = createStyles(colors);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile & Settings</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Manage your account information
        </Text>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile Picture</Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.avatarContainer}>
            {user?.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.avatarButtons}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary, { backgroundColor: colors.primary }, isUploadingImage && styles.buttonDisabled]}
              onPress={handlePickImage}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {user?.profilePicture ? 'Change Picture' : 'Upload Picture'}
                </Text>
              )}
            </TouchableOpacity>

            {user?.profilePicture && (
              <TouchableOpacity
                style={[styles.button, styles.buttonDanger, { backgroundColor: colors.error }]}
                onPress={handleRemoveImage}
              >
                <Text style={styles.buttonText}>Remove Picture</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={[styles.helperText, { color: colors.textSecondary }]}>
            Upload a square image for best results
          </Text>
        </View>
      </View>

      {/* Profile Information Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile Information</Text>
        
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled, { backgroundColor: colors.border, color: colors.textSecondary, borderColor: colors.border }]}
              value={user?.email || ''}
              editable={false}
              placeholderTextColor={colors.textSecondary}
            />
            <Text style={[styles.helperText, { color: colors.textSecondary }]}>
              Email cannot be changed
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              editable={!isUpdatingProfile}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, { backgroundColor: colors.primary }, isUpdatingProfile && styles.buttonDisabled]}
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Change Password</Text>
        
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Current Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              editable={!isUpdatingPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password (min 6 characters)"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              editable={!isUpdatingPassword}
            />
          </View>

          {/* Password Strength Indicator */}
          {newPassword.length > 0 && (
            <View style={styles.strengthContainer}>
              <PasswordStrengthIndicator password={newPassword} />
            </View>
          )}

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Confirm New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              editable={!isUpdatingPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, { backgroundColor: colors.error }, isUpdatingPassword && styles.buttonDisabled]}
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Information</Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>User ID:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{user?.uid || 'N/A'}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Account Type:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>Standard User</Text>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 20,
      paddingTop: 30,
      borderBottomWidth: 1,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
    },
    section: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 12,
    },
    card: {
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    avatarPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#fff',
    },
    avatarButtons: {
      gap: 12,
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      marginBottom: 8,
    },
    input: {
      padding: 12,
      borderRadius: 8,
      fontSize: 15,
      borderWidth: 1,
    },
    inputDisabled: {
      opacity: 0.6,
    },
    helperText: {
      fontSize: 12,
      marginTop: 4,
      textAlign: 'center',
    },
    strengthContainer: {
      marginBottom: 20,
    },
    button: {
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    buttonPrimary: {
      // backgroundColor set dynamically
    },
    buttonSecondary: {
      // backgroundColor set dynamically
    },
    buttonDanger: {
      // backgroundColor set dynamically
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
    },
    infoValue: {
      fontSize: 15,
      fontWeight: '600',
    },
    divider: {
      height: 1,
    },
  });
}
