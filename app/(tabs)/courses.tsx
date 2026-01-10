import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CoursesScreen() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Computer Science',
      code: 'CS101',
      instructor: 'Prof. John Smith',
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      progress: 65,
    },
    {
      id: 2,
      title: 'Mathematics - Calculus II',
      code: 'MATH201',
      instructor: 'Prof. Sarah Johnson',
      schedule: 'Tue, Thu - 2:00 PM',
      progress: 45,
    },
    {
      id: 3,
      title: 'English Literature',
      code: 'ENG150',
      instructor: 'Prof. Emily Davis',
      schedule: 'Mon, Wed - 1:00 PM',
      progress: 80,
    },
    {
      id: 4,
      title: 'Physics - Mechanics',
      code: 'PHYS110',
      instructor: 'Prof. Michael Chen',
      schedule: 'Tue, Thu, Sat - 11:00 AM',
      progress: 55,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enrolled Courses</Text>
        <Text style={styles.headerSubtitle}>View and manage your course enrollment</Text>
      </View>

      {/* Courses Grid */}
      <View style={styles.coursesGrid}>
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={styles.courseCodeBadge}>
                <Text style={styles.courseCode}>{course.code}</Text>
              </View>
            </View>
            
            <Text style={styles.courseInstructor}>Instructor: {course.instructor}</Text>
            <Text style={styles.courseSchedule}>{course.schedule}</Text>
            
            <View style={styles.courseProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{course.progress}% Complete</Text>
            </View>
            
            <TouchableOpacity style={styles.viewDetailsBtn}>
              <Text style={styles.viewDetailsBtnText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Course Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Course Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Courses</Text>
            <Text style={styles.summaryValue}>4</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Completed</Text>
            <Text style={[styles.summaryValue, styles.successText]}>1</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>In Progress</Text>
            <Text style={[styles.summaryValue, styles.primaryText]}>3</Text>
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
  coursesGrid: {
    padding: 20,
    paddingTop: 10,
    gap: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderTopWidth: 5,
    borderTopColor: '#3498db',
  },
  courseHeader: {
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  courseCodeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  courseCode: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
  courseInstructor: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  courseSchedule: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  courseProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  viewDetailsBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewDetailsBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  summarySection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  summaryCard: {
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
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#ecf0f1',
    marginHorizontal: 10,
  },
  successText: {
    color: '#27ae60',
  },
  primaryText: {
    color: '#3498db',
  },
});
