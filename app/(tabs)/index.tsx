import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome Back, Student!</Text>
        <Text style={styles.welcomeText}>Complete your enrollment and submit required documents.</Text>
      </View>

      {/* Dashboard Grid */}
      <View style={styles.dashboardGrid}>
        {/* Enrollment Status Card */}
        <View style={[styles.card, styles.cardPrimary]}>
          <Text style={styles.cardIcon}>📋</Text>
          <Text style={styles.cardTitle}>Enrollment Status</Text>
          <View style={[styles.statusBadge, styles.statusIncomplete]}>
            <Text style={styles.statusBadgeText}>Incomplete</Text>
          </View>
          <Text style={styles.statusText}>2 of 4 steps completed</Text>
        </View>

        {/* Documents Card */}
        <View style={[styles.card, styles.cardSuccess]}>
          <Text style={styles.cardIcon}>📁</Text>
          <Text style={styles.cardTitle}>Documents</Text>
          <Text style={styles.statusCount}>3 Uploaded</Text>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnText}>Upload More</Text>
          </TouchableOpacity>
        </View>

        {/* Courses Card */}
        <View style={[styles.card, styles.cardInfo]}>
          <Text style={styles.cardIcon}>📚</Text>
          <Text style={styles.cardTitle}>Courses</Text>
          <Text style={styles.statusCount}>4 Registered</Text>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnText}>View Courses</Text>
          </TouchableOpacity>
        </View>

        {/* Verification Card */}
        <View style={[styles.card, styles.cardWarning]}>
          <Text style={styles.cardIcon}>✓</Text>
          <Text style={styles.cardTitle}>Verification</Text>
          <View style={[styles.statusBadge, styles.statusPending]}>
            <Text style={styles.statusBadgeText}>Pending</Text>
          </View>
          <Text style={styles.statusText}>Awaiting admin review</Text>
        </View>

        {/* Fees & Payments Card */}
        <View style={[styles.card, styles.cardDanger]}>
          <Text style={styles.cardIcon}>💳</Text>
          <Text style={styles.cardTitle}>Fees & Payments</Text>
          <Text style={styles.balanceText}>Balance: ₱0.00</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.quickBtn, styles.quickBtnSmall]}>
              <Text style={styles.quickBtnText}>Check Balance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickBtn, styles.quickBtnSmall]}>
              <Text style={styles.quickBtnText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recent Payments Section */}
      <View style={styles.paymentsSection}>
        <Text style={styles.sectionTitle}>Recent Payments</Text>
        <View style={styles.paymentsCard}>
          <View style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Tuition Fee - Semester 1</Text>
              <Text style={styles.paymentDate}>Nov 15, 2024</Text>
            </View>
            <Text style={styles.paymentAmount}>₱15,000.00</Text>
          </View>
          <View style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Laboratory Fee</Text>
              <Text style={styles.paymentDate}>Nov 10, 2024</Text>
            </View>
            <Text style={styles.paymentAmount}>₱2,500.00</Text>
          </View>
          <View style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Library Fee</Text>
              <Text style={styles.paymentDate}>Nov 5, 2024</Text>
            </View>
            <Text style={styles.paymentAmount}>₱500.00</Text>
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
  welcomeSection: {
    padding: 20,
    paddingTop: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  dashboardGrid: {
    padding: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderTopWidth: 4,
  },
  cardPrimary: {
    borderTopColor: '#3498db',
  },
  cardSuccess: {
    borderTopColor: '#27ae60',
  },
  cardInfo: {
    borderTopColor: '#667eea',
  },
  cardWarning: {
    borderTopColor: '#f39c12',
  },
  cardDanger: {
    borderTopColor: '#e74c3c',
  },
  cardIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginVertical: 8,
  },
  statusIncomplete: {
    backgroundColor: '#fff3cd',
  },
  statusPending: {
    backgroundColor: '#cfe2ff',
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#856404',
  },
  statusText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 8,
  },
  statusCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginVertical: 12,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 12,
  },
  quickBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'center',
  },
  quickBtnSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  quickBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  paymentsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  paymentsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
  },
});
