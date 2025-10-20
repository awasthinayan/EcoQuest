import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Dummy Avatar component
const Avatar = ({ initials, isYou, size = 50 }) => (
  <View
    style={[
      styles.avatar,
      { width: size, height: size, borderRadius: size / 2 },
      isYou ? { backgroundColor: '#10B981' } : { backgroundColor: '#E5E7EB' },
    ]}
  >
    <Text style={{ color: isYou ? '#fff' : '#000', fontWeight: 'bold' }}>{initials}</Text>
  </View>
);

// Badge Component
const Badge = ({ text, style }) => (
  <View style={[styles.badge, style]}>
    <Text style={{ fontSize: 12, fontWeight: 'bold', color: style?.color || '#000' }}>{text}</Text>
  </View>
);

// Trend Icon Component
const Trend = ({ trend }) => {
  switch (trend) {
    case 'up':
      return <Text style={{ color: 'green' }}>⬆️</Text>;
    case 'down':
      return <Text style={{ color: 'red' }}>⬇️</Text>;
    default:
      return <Text style={{ color: '#6B7280' }}>—</Text>;
  }
};

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');

  const globalLeaders = [
    { rank: 1, name: 'Emma Green', initials: 'EG', xp: 5420, co2Saved: 245, level: 12, trend: 'same' },
    { rank: 2, name: 'David Chen', initials: 'DC', xp: 5180, co2Saved: 238, level: 11, trend: 'up' },
    { rank: 3, name: 'Sarah Johnson', initials: 'SJ', xp: 4950, co2Saved: 221, level: 11, trend: 'down' },
    { rank: 4, name: 'Alex Rivera', initials: 'AR', xp: 4320, co2Saved: 198, level: 10, trend: 'up', isYou: true },
    { rank: 5, name: 'Michael Brown', initials: 'MB', xp: 3890, co2Saved: 182, level: 9, trend: 'same' },
  ];

  const friendsLeaders = [
    { rank: 1, name: 'Sarah Johnson', initials: 'SJ', xp: 4950, co2Saved: 221, level: 11, trend: 'same' },
    { rank: 2, name: 'Alex Rivera', initials: 'AR', xp: 4320, co2Saved: 198, level: 10, trend: 'up', isYou: true },
    { rank: 3, name: 'Chris Lee', initials: 'CL', xp: 3120, co2Saved: 145, level: 8, trend: 'down' },
  ];

  const localLeaders = [
    { rank: 1, name: 'Alex Rivera', initials: 'AR', xp: 4320, co2Saved: 198, level: 10, trend: 'up', isYou: true },
    { rank: 2, name: 'Local Hero', initials: 'LH', xp: 3980, co2Saved: 185, level: 9, trend: 'down' },
    { rank: 3, name: 'Eco Warrior', initials: 'EW', xp: 3450, co2Saved: 162, level: 8, trend: 'up' },
  ];

  const getCurrentLeaders = () => {
    switch (activeTab) {
      case 'global':
        return globalLeaders;
      case 'friends':
        return friendsLeaders;
      case 'local':
        return localLeaders;
      default:
        return globalLeaders;
    }
  };

  const leaders = getCurrentLeaders();
  const topThree = leaders.slice(0, 3);
  const remaining = leaders.slice(3);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return { backgroundColor: '#FACC15', color: '#fff' };
      case 2: return { backgroundColor: '#9CA3AF', color: '#fff' };
      case 3: return { backgroundColor: '#B45309', color: '#fff' };
      default: return { backgroundColor: '#E5E7EB', color: '#374151' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Leaderboard 🏆</Text>
      <Text style={styles.subtitle}>See how you rank against other eco-warriors</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['global', 'friends', 'local'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podium}>
        {topThree.map((user, index) => (
          <View key={user.rank} style={styles.podiumItem}>
            <Avatar initials={user.initials} isYou={user.isYou} size={index === 0 ? 70 : 60} />
            <Text style={styles.name}>{user.name}</Text>
            <Badge text={`${user.xp} XP`} style={{ backgroundColor: '#F59E0B', color: '#fff' }} />
            <View style={[styles.rankBox, { backgroundColor: getRankColor(user.rank).backgroundColor }]}>
              <Text style={{ color: getRankColor(user.rank).color }}>#{user.rank}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Remaining Users */}
      <View>
        {remaining.map((user) => (
          <View key={user.rank} style={[styles.card, user.isYou && { borderColor: '#10B981', borderWidth: 2 }]}>
            <View style={styles.cardRow}>
              <View style={getRankColor(user.rank)}>
                <Text style={{ color: '#fff', fontWeight: 'bold', padding: 8 }}>{user.rank}</Text>
              </View>
              <Avatar initials={user.initials} isYou={user.isYou} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{user.name} {user.isYou && ' (You)'}</Text>
                <Text style={styles.smallText}>Level {user.level} • {user.co2Saved} kg CO₂ saved</Text>
              </View>
              <Trend trend={user.trend} />
            </View>
          </View>
        ))}
      </View>

      {/* Your Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <View>
            <Text style={styles.statsNumber}>4th</Text>
            <Text style={styles.statsLabel}>Global Rank</Text>
          </View>
          <View>
            <Text style={styles.statsNumber}>198 kg</Text>
            <Text style={styles.statsLabel}>CO₂ Saved</Text>
          </View>
          <View>
            <Text style={styles.statsNumber}>Level 10</Text>
            <Text style={styles.statsLabel}>Current Level</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#059669' },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  tabs: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#E5E7EB', borderRadius: 8 },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center' },
  activeTab: { backgroundColor: '#fff', borderRadius: 8 },
  tabText: { color: '#6B7280', fontWeight: 'bold' },
  activeTabText: { color: '#000' },
  podium: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  podiumItem: { alignItems: 'center', flex: 1 },
  name: { marginTop: 4, fontWeight: 'bold', textAlign: 'center' },
  badge: { marginTop: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: '#F59E0B' },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  rankBox: { marginTop: 4, borderRadius: 6, paddingVertical: 2, paddingHorizontal: 6 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: '#fff', marginBottom: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  smallText: { fontSize: 12, color: '#6B7280' },
  statsCard: { padding: 16, borderRadius: 12, backgroundColor: '#10B981', marginVertical: 16 },
  statsTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statsNumber: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  statsLabel: { fontSize: 12, color: '#D1FAE5' },
});
