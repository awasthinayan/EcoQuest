import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';


// Sample data
const badges = [
  { id: 1, name: 'Bike Boss', icon: '🚴', earned: true, rarity: 'rare' },
  { id: 2, name: 'Meatless Master', icon: '🥗', earned: true, rarity: 'epic' },
  { id: 3, name: 'Energy Saver', icon: '💡', earned: true, rarity: 'common' },
  { id: 4, name: 'Zero Waste', icon: '♻️', earned: false, rarity: 'legendary' },
  { id: 5, name: 'Water Hero', icon: '💧', earned: true, rarity: 'rare' },
];

const achievements = [
  { title: '7 Day Streak', date: 'Oct 15, 2025', xp: 100 },
  { title: 'Completed 10 Missions', date: 'Oct 10, 2025', xp: 250 },
];

const rewards = [
  { id: 1, name: '10% Off EcoBrand', description: 'Discount on sustainable products', cost: 500, available: true },
  { id: 2, name: 'Plant a Tree', description: 'Plant a real tree in your name', cost: 1000, available: false },
];

export function Profile() {
  const currentLevel = 10;
  const currentXP = 1250;
  const nextLevelXP = 1500;
  const xpProgress = currentXP / nextLevelXP;

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return '#e5e7eb';
      case 'rare':
        return '#bfdbfe';
      case 'epic':
        return '#ddd6fe';
      case 'legendary':
        return '#fef3c7';
      default:
        return '#e5e7eb';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={[styles.card, { backgroundColor: '#10b981' }]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Alex Rivera</Text>
            <Text style={styles.username}>@alexrivera</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.settings}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.levelRow}>
          <Text style={styles.levelText}>Level {currentLevel}</Text>
          <Text style={styles.levelText}>{currentXP} XP</Text>
        </View>

        <Text style={styles.progressText}>Progress to Level {currentLevel + 1}</Text>
        <Text style={styles.progressText}>{currentXP} / {nextLevelXP} XP</Text>

        <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${xpProgress * 100}%` }]} />
  </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#059669' }]}>
          <Text style={styles.actionText}>📤 Share Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#d97706' }]}>
          <Text style={styles.actionText}>🎁 Claim Rewards</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.grid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🎯</Text>
          <Text style={styles.statValue}>23</Text>
          <Text style={styles.statLabel}>Missions Done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={styles.statValue}>198 kg</Text>
          <Text style={styles.statLabel}>CO₂ Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏆</Text>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Badges</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgesContainer}>
          {badges.map((badge) => (
            <View
              key={badge.id}
              style={[
                styles.badge,
                { backgroundColor: badge.earned ? getRarityColor(badge.rarity) : '#f3f4f6', opacity: badge.earned ? 1 : 0.4 },
              ]}
            >
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text>{badge.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement, idx) => (
          <View key={idx} style={styles.achievement}>
            <View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDate}>📅 {achievement.date}</Text>
            </View>
            <Text style={styles.xpBadge}>+{achievement.xp} XP</Text>
          </View>
        ))}
      </View>

      {/* Rewards */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Rewards Store</Text>
        {rewards.map((reward) => (
          <View key={reward.id} style={[styles.reward, { opacity: reward.available ? 1 : 0.5 }]}>
            <View>
              <Text style={styles.rewardTitle}>{reward.name}</Text>
              <Text style={styles.rewardDesc}>{reward.description}</Text>
            </View>
            <Text style={styles.rewardXP}>{reward.cost} XP</Text>
            <TouchableOpacity
              style={[styles.rewardButton, { backgroundColor: reward.available ? '#10b981' : '#9ca3af' }]}
              disabled={!reward.available}
            >
              <Text style={styles.rewardButtonText}>{reward.available ? 'Claim Reward' : 'Not Enough XP'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Impact Summary */}
      <View style={[styles.card, { backgroundColor: '#10b981' }]}>
        <Text style={styles.sectionTitle}>Your Total Impact 🌍</Text>
        <View style={styles.grid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>198 kg</Text>
            <Text style={styles.statLabel}>Total CO₂ Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>23</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Eco-Actions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
        <Text style={styles.bottomText}>You're in the top 5% of eco-warriors globally!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fefefe' },
  card: { borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  username: { fontSize: 14, color: '#d1fae5' },
  settings: { fontSize: 20, color: '#fff' },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  levelText: { color: '#fff', fontWeight: 'bold' },
  progressText: { color: '#fff', marginVertical: 2 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  actionButton: { flex: 1, padding: 16, borderRadius: 12, marginHorizontal: 4, alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', backgroundColor: '#f3f4f6', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center' },
  statIcon: { fontSize: 28, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#6b7280', textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#fff' },
  badgesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { width: 80, height: 80, borderRadius: 12, justifyContent: 'center', alignItems: 'center', margin: 4 },
  badgeIcon: { fontSize: 28, marginBottom: 4 },
  achievement: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#d1fae5', borderRadius: 12, marginBottom: 8 },
  achievementTitle: { fontWeight: 'bold' },
  achievementDate: { fontSize: 12, color: '#4b5563' },
  xpBadge: { backgroundColor: '#f59e0b', color: '#fff', padding: 4, borderRadius: 8, fontWeight: 'bold' },
  reward: { borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: '#fff', elevation: 2 },
  rewardTitle: { fontWeight: 'bold', fontSize: 14 },
  rewardDesc: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
  rewardXP: { fontWeight: 'bold', marginBottom: 8 },
  rewardButton: { padding: 12, borderRadius: 8, alignItems: 'center' },
  rewardButtonText: { color: '#fff', fontWeight: 'bold' },
  bottomText: { color: '#fff', marginTop: 12, fontWeight: 'bold' },
  progressContainer: {
  height: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: 5,
  marginTop: 8,
  overflow: 'hidden',
},
progressBar: {
  height: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
},
});