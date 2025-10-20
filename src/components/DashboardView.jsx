import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Badge Component
const Badge = ({ text, style }) => (
  <View style={[styles.badge, style]}>
    <Text style={{ color: style?.color || '#000', fontWeight: 'bold', fontSize: 12 }}>{text}</Text>
  </View>
);

// Card Component
const Card = ({ children, style, gradient }) =>
  gradient ? (
    <LinearGradient colors={gradient} style={[styles.card, style]}>
      {children}
    </LinearGradient>
  ) : (
    <View style={[styles.card, styles.cardShadow, style]}>{children}</View>
  );

// Progress Component
const Progress = ({ value, style }) => (
  <View style={[styles.progressContainer, style]}>
    <View style={[styles.progressBar, { width: `${value}%` }]} />
  </View>
);

// Icons
const Flame = () => <Text style={{ fontSize: 28 }}>🔥</Text>;
const Zap = () => <Text style={{ fontSize: 28 }}>⚡</Text>;
const TrendingDown = () => <Text style={{ fontSize: 20 }}>⬇️</Text>;
const Award = () => <Text style={{ fontSize: 28 }}>🏆</Text>;
const Calendar = () => <Text style={{ fontSize: 28 }}>📅</Text>;
const Leaf = () => <Text style={{ fontSize: 28 }}>🍃</Text>;

export function Dashboard() {
  const weeklyGoal = 100;
  const currentEmissions = 65;
  const progressPercent = ((weeklyGoal - currentEmissions) / weeklyGoal) * 100;
  const streak = 12;

  const todayActivities = [
    { id: 1, activity: '🚴 Biked to work', co2Saved: 5.2, xp: 50 },
    { id: 2, activity: '🥗 Vegetarian lunch', co2Saved: 2.1, xp: 25 },
    { id: 3, activity: '💡 LED lights on', co2Saved: 0.8, xp: 10 },
  ];

  const quickStats = [
    { label: 'This Week', value: '35 kg', icon: TrendingDown, color: '#10B981' },
    { label: 'This Month', value: '142 kg', icon: Leaf, color: '#059669' },
    { label: 'Trees Planted', value: '23', icon: Award, color: '#D97706' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome */}
      <Text style={styles.title}>Welcome back, Alex! 👋</Text>
      <Text style={styles.subtitle}>You're doing great! Keep up the eco-friendly habits.</Text>

      {/* Streak Card */}
      <Card
        gradient={['#F97316', '#EF4444']}
        style={{ padding: 16, marginBottom: 16 }}
      >
        <View style={styles.rowSpace}>
          <View>
            <View style={styles.rowSpace}>
              <Flame />
              <Text style={styles.streakNumber}>{streak}</Text>
            </View>
            <Text style={styles.streakLabel}>Day Streak 🔥</Text>
            <Text style={styles.streakSubLabel}>Don't break the chain!</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Calendar />
            <Text style={styles.streakSubLabel}>Next reward in 3 days</Text>
          </View>
        </View>
      </Card>

      {/* Carbon Budget */}
      <Card style={{ padding: 16, marginBottom: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <View style={styles.rowSpace}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Weekly Carbon Budget</Text>
            <Badge
              text={`${currentEmissions} / ${weeklyGoal} kg CO₂`}
              style={{ backgroundColor: '#D1FAE5', color: '#065F46', paddingHorizontal: 8 }}
            />
          </View>
          <Progress value={progressPercent} />
        </View>
        <View style={styles.rowSpace}>
          <TrendingDown />
          <Text style={{ color: '#059669' }}>
            You've saved {weeklyGoal - currentEmissions} kg CO₂ this week! 🎉
          </Text>
        </View>
      </Card>

      {/* Quick Stats */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        {quickStats.map((stat, index) => (
          <Card key={index} style={{ flex: 1, marginHorizontal: 4, padding: 16, alignItems: 'center' }}>
            <stat.icon />
            <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{stat.label}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{stat.value}</Text>
          </Card>
        ))}
      </View>

      {/* Today's Activities */}
      <Card style={{ padding: 16, marginBottom: 16 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Today's Eco-Actions 🌱</Text>
        {todayActivities.map((act) => (
          <View
            key={act.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#D1FAE5',
              padding: 12,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <View>
              <Text style={{ fontWeight: 'bold' }}>{act.activity}</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>-{act.co2Saved} kg CO₂</Text>
            </View>
            <Badge text={`+${act.xp} XP`} style={{ backgroundColor: '#F59E0B', color: '#fff' }} />
          </View>
        ))}
      </Card>

      {/* Impact Summary */}
      <Card
        gradient={['#10B981', '#14B8A6']}
        style={{ padding: 16, marginBottom: 16 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Zap />
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: 8 }}>
            Your Impact This Month
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>142 kg</Text>
            <Text style={{ fontSize: 12, color: '#D1FAE5' }}>CO₂ Saved</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>23</Text>
            <Text style={{ fontSize: 12, color: '#D1FAE5' }}>Trees Equivalent</Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: '#D1FAE5', marginTop: 12 }}>
          That's like not driving a car for <Text style={{ fontWeight: 'bold' }}>590 km</Text> 🚗💨
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#059669', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  streakNumber: { fontSize: 32, fontWeight: 'bold' },
  streakLabel: { opacity: 0.9 },
  streakSubLabel: { fontSize: 12, opacity: 0.75 },
  card: { borderRadius: 12, backgroundColor: '#fff', marginBottom: 16 },
  cardShadow: { 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 4 
  },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  progressContainer: { width: '100%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginTop: 4 },
  progressBar: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
});
