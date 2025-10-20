import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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

export function Missions() {
  const [activeTab, setActiveTab] = useState('daily');

  const missions = [
    { id: 'm1', title: 'Bike Boss', description: 'Bike to work for 5 days', progress: 3, goal: 5, xp: 200, icon: '🚴', difficulty: 'medium', timeLeft: '4 days left' },
    { id: 'm2', title: 'Meatless Master', description: 'Go vegetarian for 7 days', progress: 7, goal: 7, xp: 150, icon: '🥗', difficulty: 'medium', completed: true },
    { id: 'm3', title: 'Energy Saver', description: 'Reduce energy by 20% this week', progress: 12, goal: 20, xp: 100, icon: '💡', difficulty: 'easy', timeLeft: '3 days left' },
    { id: 'm4', title: 'Zero Waste Warrior', description: 'Use zero single-use plastic for 3 days', progress: 2, goal: 3, xp: 250, icon: '♻️', difficulty: 'hard', timeLeft: '1 day left' },
    { id: 'm5', title: 'Public Transit Pro', description: 'Take public transport 10 times', progress: 6, goal: 10, xp: 120, icon: '🚌', difficulty: 'easy', timeLeft: '6 days left' },
    { id: 'm6', title: 'Water Conservation Champion', description: 'Reduce water usage by 30%', progress: 0, goal: 30, xp: 300, icon: '💧', difficulty: 'hard', timeLeft: '7 days left' },
    { id: 'm7', title: 'Local Hero', description: 'Buy 5 local products', progress: 3, goal: 5, xp: 80, icon: '🏪', difficulty: 'easy', timeLeft: '5 days left' },
    { id: 'm8', title: 'Solar Superstar', description: 'Use solar power for 14 days', progress: 0, goal: 14, xp: 500, icon: '☀️', difficulty: 'hard', locked: true },
  ];

  const challenges = [
    { id: 'c1', title: 'Weekend Warrior', description: 'Complete 3 eco-actions this weekend', xp: 150, icon: '🎯', timeLeft: '2 days' },
    { id: 'c2', title: 'Team Challenge', description: 'Reduce 50kg CO₂ as a community', xp: 300, icon: '👥', timeLeft: '5 days' },
    { id: 'c3', title: 'Flash Mission', description: 'Log 5 activities in the next hour', xp: 100, icon: '⚡', timeLeft: '45 min' },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'medium':
        return { backgroundColor: '#FEF3C7', color: '#B45309' };
      case 'hard':
        return { backgroundColor: '#FECACA', color: '#991B1B' };
      default:
        return { backgroundColor: '#E5E7EB', color: '#374151' };
    }
  };

  const activeMissions = missions.filter((m) => !m.completed && !m.locked);
  const completedMissions = missions.filter((m) => m.completed);
  const lockedMissions = missions.filter((m) => m.locked);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Missions & Challenges 🎯</Text>
      <Text style={styles.subtitle}>Complete missions to earn XP and unlock rewards</Text>

      {/* Stats Cards */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <Card gradient={['#10B981', '#14B8A6']} style={{ flex: 1, marginRight: 4, alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 24 }}>🎯</Text>
          <Text style={styles.statNumber}>{activeMissions.length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </Card>
        <Card gradient={['#F59E0B', '#EF4444']} style={{ flex: 1, marginHorizontal: 4, alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 24 }}>🏆</Text>
          <Text style={styles.statNumber}>{completedMissions.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </Card>
        <Card gradient={['#8B5CF6', '#EC4899']} style={{ flex: 1, marginLeft: 4, alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 24 }}>🔥</Text>
          <Text style={styles.statNumber}>1,250</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </Card>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('daily')}
          style={[styles.tabButton, activeTab === 'daily' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'daily' && { color: '#000' }]}>Daily Missions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('challenges')}
          style={[styles.tabButton, activeTab === 'challenges' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'challenges' && { color: '#000' }]}>Special Challenges</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Missions */}
      {activeTab === 'daily' && (
        <View style={{ marginTop: 16 }}>
          {/* Active Missions */}
          {activeMissions.map((mission) => (
            <Card key={mission.id} style={{ padding: 16, marginBottom: 12 }}>
              <View style={styles.rowSpace}>
                <Text style={{ fontSize: 32 }}>{mission.icon}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{mission.title}</Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>{mission.description}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 8, flexWrap: 'wrap', gap: 4 }}>
                    <Badge text={mission.difficulty} style={getDifficultyColor(mission.difficulty)} />
                    <Badge text={`+${mission.xp} XP`} style={{ backgroundColor: '#FEF3C7', color: '#B45309' }} />
                    {mission.timeLeft && (
                      <Text style={{ fontSize: 10, color: '#6B7280', marginLeft: 4 }}>⏰ {mission.timeLeft}</Text>
                    )}
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>Progress: {mission.progress} / {mission.goal}</Text>
                    <Progress value={(mission.progress / mission.goal) * 100} />
                  </View>
                </View>
              </View>
            </Card>
          ))}

          {/* Completed Missions */}
          {completedMissions.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>🏆 Completed Missions</Text>
              {completedMissions.map((mission) => (
                <Card key={mission.id} style={{ padding: 16, marginBottom: 12, backgroundColor: '#D1FAE5' }}>
                  <View style={styles.rowSpace}>
                    <Text style={{ fontSize: 32 }}>{mission.icon}</Text>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={{ fontWeight: 'bold', textDecorationLine: 'line-through' }}>{mission.title}</Text>
                      <Badge text={`✓ Completed · +${mission.xp} XP`} style={{ backgroundColor: '#065F46', color: '#fff' }} />
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* Locked Missions */}
          {lockedMissions.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>🔒 Locked Missions</Text>
              {lockedMissions.map((mission) => (
                <Card key={mission.id} style={{ padding: 16, marginBottom: 12, backgroundColor: '#F3F4F6', opacity: 0.6 }}>
                  <View style={styles.rowSpace}>
                    <Text style={{ fontSize: 32, color: '#9CA3AF' }}>{mission.icon}</Text>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={{ fontWeight: 'bold' }}>{mission.title}</Text>
                      <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Complete level 10 to unlock</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Special Challenges */}
      {activeTab === 'challenges' && (
        <View style={{ marginTop: 16 }}>
          {challenges.map((challenge) => (
            <Card key={challenge.id} gradient={['#F3E8FF', '#FBCFE8']} style={{ padding: 16, marginBottom: 12 }}>
              <View style={styles.rowSpace}>
                <Text style={{ fontSize: 32 }}>{challenge.icon}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{challenge.title}</Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>{challenge.description}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <Badge text={`+${challenge.xp} XP`} style={{ backgroundColor: '#FEF3C7', color: '#B45309', marginRight: 4 }} />
                    <Text style={{ fontSize: 10, color: '#B91C1C' }}>⏰ {challenge.timeLeft}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[styles.button, { marginTop: 12 }]}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Accept Challenge</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#059669', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: '#fff', opacity: 0.9 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  tabText: { fontSize: 14, color: '#6B7280' },
  rowSpace: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  card: { borderRadius: 12, backgroundColor: '#fff', marginBottom: 16 },
  cardShadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginRight: 4 },
  progressContainer: { width: '100%', height: 6, backgroundColor: '#E5E7EB', borderRadius: 4, marginTop: 4 },
  progressBar: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  button: { backgroundColor: '#8B5CF6', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
});
