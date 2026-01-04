import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <Text style={styles.headerSubtitle}>View and update your profile information</Text>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.profilePictureSection}>
        <View style={styles.profilePicture}>
          <Text style={styles.profileInitial}>S</Text>
        </View>
        <TouchableOpacity style={styles.changePhotoBtn}>
          <Text style={styles.changePhotoBtnText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Form */}
      <View style={styles.formSection}>
        <View style={styles.formRow}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={styles.input}
              value="John"
              editable={false}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              value="Doe"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value="student@edu.com"
            editable={false}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            value="+1 (555) 123-4567"
            editable={false}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Student ID:</Text>
          <TextInput
            style={styles.input}
            value="STU2024001"
            editable={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Enrollment Date:</Text>
          <TextInput
            style={styles.input}
            value="November 1, 2024"
            editable={false}
          />
        </View>

        <View style={styles.formRow}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Program:</Text>
            <TextInput
              style={styles.input}
              value="Bachelor of Science"
              editable={false}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Current Semester:</Text>
            <TextInput
              style={styles.input}
              value="Fall 2024"
              editable={false}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Academic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>GPA</Text>
            <Text style={styles.infoValue}>3.75</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Credits Earned</Text>
            <Text style={styles.infoValue}>45</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Year Level</Text>
            <Text style={styles.infoValue}>2nd</Text>
          </View>
        </View>
      </View>
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
  profilePictureSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  changePhotoBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  changePhotoBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroup: {
    flex: 1,
    marginBottom: 16,
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
    borderRadius: 6,
    fontSize: 15,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  editBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  editBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#ecf0f1',
    marginHorizontal: 10,
  },
});
