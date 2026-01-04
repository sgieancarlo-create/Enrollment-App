import { StyleSheet, Text, View } from 'react-native';
import { calculatePasswordStrength, getStrengthColor, getStrengthLabel } from '../src/utils/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
  showCriteria?: boolean;
}

export function PasswordStrengthIndicator({ password, showCriteria = true }: PasswordStrengthIndicatorProps) {
  const result = calculatePasswordStrength(password);
  const strengthColor = getStrengthColor(result.strength);
  const strengthLabel = getStrengthLabel(result.strength);

  if (!password) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Strength Bar */}
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: `${result.score}%`,
                backgroundColor: strengthColor,
              },
            ]}
          />
        </View>
        <Text style={[styles.strengthLabel, { color: strengthColor }]}>
          {strengthLabel}
        </Text>
      </View>

      {/* Criteria Checklist */}
      {showCriteria && (
        <View style={styles.criteriaContainer}>
          <CriteriaItem
            label="At least 8 characters"
            met={result.criteria.length}
          />
          <CriteriaItem
            label="Uppercase letter (A-Z)"
            met={result.criteria.uppercase}
          />
          <CriteriaItem
            label="Lowercase letter (a-z)"
            met={result.criteria.lowercase}
          />
          <CriteriaItem
            label="Number (0-9)"
            met={result.criteria.numbers}
          />
          <CriteriaItem
            label="Special character (!@#$%^&*)"
            met={result.criteria.special}
          />
        </View>
      )}

      {/* Feedback */}
      {result.feedback.length > 0 && (
        <View style={styles.feedbackContainer}>
          {result.feedback.map((item, index) => (
            <Text key={index} style={styles.feedbackText}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

interface CriteriaItemProps {
  label: string;
  met: boolean;
}

function CriteriaItem({ label, met }: CriteriaItemProps) {
  return (
    <View style={styles.criteriaItem}>
      <Text style={[styles.criteriaIcon, met && styles.criteriaIconMet]}>
        {met ? '✓' : '○'}
      </Text>
      <Text style={[styles.criteriaLabel, met && styles.criteriaLabelMet]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  strengthLabel: {
    fontSize: 13,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'right',
  },
  criteriaContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  criteriaIcon: {
    fontSize: 14,
    color: '#95a5a6',
    marginRight: 8,
    width: 16,
  },
  criteriaIconMet: {
    color: '#27ae60',
  },
  criteriaLabel: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  criteriaLabelMet: {
    color: '#2c3e50',
  },
  feedbackContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  feedbackText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
});
