import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native'; // Use react-native lucide

const activities = {
  travel: [
    { id: 't1', category: 'travel', name: 'Walked', co2: -0.0, icon: '🚶', xp: 20 },
    { id: 't2', category: 'travel', name: 'Biked', co2: -0.0, icon: '🚴', xp: 30 },
    { id: 't3', category: 'travel', name: 'Public Transport', co2: 2.5, icon: '🚌', xp: 25 },
    { id: 't4', category: 'travel', name: 'Carpooled', co2: 3.2, icon: '🚗', xp: 15 },
    { id: 't5', category: 'travel', name: 'Drove Alone', co2: 6.5, icon: '🚙', xp: -10 },
    { id: 't6', category: 'travel', name: 'Electric Scooter', co2: 0.5, icon: '🛴', xp: 35 },
  ],
  food: [
    { id: 'f1', category: 'food', name: 'Vegan Meal', co2: 0.7, icon: '🥗', xp: 40 },
    { id: 'f2', category: 'food', name: 'Vegetarian Meal', co2: 1.5, icon: '🥙', xp: 30 },
    { id: 'f3', category: 'food', name: 'Fish', co2: 2.8, icon: '🐟', xp: 15 },
    { id: 'f4', category: 'food', name: 'Chicken', co2: 3.5, icon: '🍗', xp: 5 },
    { id: 'f5', category: 'food', name: 'Beef', co2: 7.2, icon: '🍔', xp: -5 },
    { id: 'f6', category: 'food', name: 'Local Produce', co2: 0.5, icon: '🌽', xp: 35 },
  ],
  energy: [
    { id: 'e1', category: 'energy', name: 'LED Lights All Day', co2: 0.3, icon: '💡', xp: 20 },
    { id: 'e2', category: 'energy', name: 'Unplugged Devices', co2: -0.5, icon: '🔌', xp: 25 },
    { id: 'e3', category: 'energy', name: 'Used AC (1hr)', co2: 1.8, icon: '❄️', xp: 0 },
    { id: 'e4', category: 'energy', name: 'Solar Power', co2: -1.0, icon: '☀️', xp: 50 },
    { id: 'e5', category: 'energy', name: 'Cold Water Laundry', co2: 0.4, icon: '🌊', xp: 30 },
  ],
  shopping: [
    { id: 's1', category: 'shopping', name: 'Reusable Bag', co2: -0.2, icon: '🛍️', xp: 15 },
    { id: 's2', category: 'shopping', name: 'Thrifted Item', co2: -1.5, icon: '♻️', xp: 40 },
    { id: 's3', category: 'shopping', name: 'Local Product', co2: 0.8, icon: '🏪', xp: 25 },
    { id: 's4', category: 'shopping', name: 'New Electronics', co2: 15.0, icon: '📱', xp: -15 },
    { id: 's5', category: 'shopping', name: 'Fast Fashion', co2: 8.0, icon: '👕', xp: -10 },
  ],
};

export function CarbonLogger() {
  const [selectedActivities, setSelectedActivities] = useState(new Set());
  const [totalCO2, setTotalCO2] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [activeTab, setActiveTab] = useState('travel');

  const toggleActivity = (activity) => {
    const newSelected = new Set(selectedActivities);
    if (newSelected.has(activity.id)) {
      newSelected.delete(activity.id);
      setTotalCO2(totalCO2 - activity.co2);
      setTotalXP(totalXP - activity.xp);
    } else {
      newSelected.add(activity.id);
      setTotalCO2(totalCO2 + activity.co2);
      setTotalXP(totalXP + activity.xp);
    }
    setSelectedActivities(newSelected);
  };

  const handleSave = () => {
    if (selectedActivities.size === 0) return;
    Alert.alert(
      '🎉 Logged Activities!',
      `Total CO₂: ${totalCO2.toFixed(1)} kg\nXP Earned: ${totalXP > 0 ? '+' : ''}${totalXP}`,
      [{ text: 'OK', onPress: () => {
        setSelectedActivities(new Set());
        setTotalCO2(0);
        setTotalXP(0);
      }}]
    );
  };

  const renderActivityCard = (activity) => {
    const isSelected = selectedActivities.has(activity.id);
    const isGood = activity.co2 <= 1.5;
    return (
      <TouchableOpacity
        key={activity.id}
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => toggleActivity(activity)}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.icon}>{activity.icon}</Text>
          <View>
            <Text style={styles.name}>{activity.name}</Text>
            <View style={styles.badges}>
              <Text style={[styles.badge, isGood ? styles.goodBadge : styles.badBadge]}>
                {activity.co2 > 0 ? '+' : ''}{activity.co2} kg CO₂
              </Text>
              <Text style={[styles.badge, activity.xp > 0 ? styles.xpBadge : styles.badXPBadge]}>
                {activity.xp > 0 ? '+' : ''}{activity.xp} XP
              </Text>
            </View>
          </View>
        </View>
        {isSelected ? (
          <View style={styles.checkCircle}>
            <Check width={20} height={20} color="white" />
          </View>
        ) : (
          <View style={styles.emptyCircle} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>Log Your Actions 📝</Text>
      <Text style={styles.subtitle}>Track your daily activities and see their carbon impact</Text>

      {/* Summary */}
      {selectedActivities.size > 0 && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Selected Activities</Text>
              <Text style={styles.summaryValue}>{selectedActivities.size} actions</Text>
            </View>
            <View>
              <Text style={styles.summaryLabel}>Total Impact</Text>
              <Text style={[styles.summaryValue, totalCO2 < 0 ? styles.positive : {}]}>
                {totalCO2 > 0 ? '+' : ''}{totalCO2.toFixed(1)} kg CO₂
              </Text>
            </View>
            <View>
              <Text style={styles.summaryLabel}>XP</Text>
              <Text style={[styles.summaryValue, totalXP > 0 ? styles.xpPositive : styles.xpNegative]}>
                {totalXP > 0 ? '+' : ''}{totalXP}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Check width={18} height={18} color="white" />
            <Text style={styles.saveText}>Save Activities</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabRow}>
        {Object.keys(activities).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activities */}
      {activities[activeTab].map(renderActivityCard)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#047857', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  summaryCard: { padding: 16, backgroundColor: '#D1FAE5', borderRadius: 12, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 12, color: '#6B7280' },
  summaryValue: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  positive: { color: '#047857' },
  xpPositive: { color: '#D97706' },
  xpNegative: { color: '#B91C1C' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#047857', padding: 12, borderRadius: 8 },
  saveText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#E5E7EB' },
  activeTabButton: { backgroundColor: 'white', borderWidth: 1, borderColor: '#047857' },
  tabText: { color: '#6B7280', fontWeight: 'bold' },
  activeTabText: { color: '#047857', fontWeight: 'bold' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#D1D5DB', marginBottom: 12, backgroundColor: 'white' },
  selectedCard: { backgroundColor: '#D1FAE5', borderColor: '#10B981', shadowColor: '#10B981', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { fontSize: 28 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  badges: { flexDirection: 'row', gap: 8, marginTop: 4 },
  badge: { fontSize: 12, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 },
  goodBadge: { backgroundColor: '#DCFCE7', color: '#047857' },
  badBadge: { backgroundColor: '#FEF3C7', color: '#B45309' },
  xpBadge: { backgroundColor: '#FEF3C7', color: '#B45309' },
  badXPBadge: { backgroundColor: '#FECACA', color: '#B91C1C' },
  checkCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center' },
  emptyCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#D1D5DB' },
});
