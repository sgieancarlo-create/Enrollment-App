import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Mock Dashboard Screen
const DashboardScreen = () => {
  const [balance, setBalance] = useState(2500);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fees & Payments</Text>
        <Text style={styles.balance}>₱{balance.toLocaleString()}</Text>
        <Text style={styles.balanceLabel}>Outstanding Balance</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Enrolled Courses</Text>
        <Text style={styles.courseItem}>• BSIT 101 - Introduction to IT</Text>
        <Text style={styles.courseItem}>• BSIT 102 - Programming Basics</Text>
        <Text style={styles.courseItem}>• BSIT 103 - Web Development</Text>
      </View>
    </ScrollView>
  );
};

// Mock Upload Screen
const UploadScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Upload</Text>
      </View>

      <View style={styles.uploadArea}>
        <MaterialCommunityIcons name="cloud-upload" size={50} color="#4CAF50" />
        <Text style={styles.uploadText}>Tap to upload documents</Text>
        <Text style={styles.uploadSubtext}>Drag & drop or browse files</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Accepted Formats</Text>
        <Text style={styles.acceptedItem}>• PDF</Text>
        <Text style={styles.acceptedItem}>• DOC / DOCX</Text>
        <Text style={styles.acceptedItem}>• JPG / PNG</Text>
      </View>
    </ScrollView>
  );
};

// Mock Profile Screen
const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.fieldLabel}>Name</Text>
        <Text style={styles.fieldValue}>Juan Dela Cruz</Text>

        <Text style={styles.fieldLabel}>Email</Text>
        <Text style={styles.fieldValue}>juan@student.edu</Text>

        <Text style={styles.fieldLabel}>Student ID</Text>
        <Text style={styles.fieldValue}>2023-001234</Text>

        <Text style={styles.fieldLabel}>Program</Text>
        <Text style={styles.fieldValue}>Bachelor of Science in Information Technology</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Mock Settings Screen
const SettingsScreen = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.settingsTitle}>App Preferences</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Theme</Text>
          <Text style={styles.settingValue}>{theme === 'light' ? 'Light' : 'Dark'}</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Text style={styles.settingValue}>Enabled</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingValue}>English</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.settingsTitle}>About</Text>
        <Text style={styles.aboutText}>Version 1.0.0</Text>
        <Text style={styles.aboutText}>Enrollment System © 2025</Text>
      </View>
    </ScrollView>
  );
};

// Main App
export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#4CAF50');
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Upload') {
              iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  btn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  courseItem: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  uploadArea: {
    margin: 15,
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#4CAF50',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  acceptedItem: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 15,
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 14,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 13,
    color: '#999',
    marginVertical: 5,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 5,
  },
});
