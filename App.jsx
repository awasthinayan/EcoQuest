import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dashboard } from './src/components/DashboardView';
import { CarbonLogger } from './src/components/CarbonLogger';
import { Missions } from './src/components/Missions';
import { Leaderboard } from './src/components/LeaderboardView';
import { Profile } from './src/components/ProfileView';
import { Home, Leaf, Target, Trophy, User } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'logger':
        return <CarbonLogger />;
      case 'missions':
        return <Missions />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.leafContainer}>
              <Leaf color="white" size={24} />
            </View>
            <Text style={styles.headerTitle}>EcoQuest</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.levelText}>Level 5</Text>
            <Text style={styles.xpText}>⭐ 1,250 XP</Text>
          </View>
        </View>

        {/* Main Content */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {renderContent()}
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Bottom Navigation */}
        <SafeAreaView edges={['bottom']} style={styles.bottomSafe}>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={[styles.navButton, activeTab === 'dashboard' && styles.activeNavButton]}
              onPress={() => setActiveTab('dashboard')}
            >
              <Home size={20} color={activeTab === 'dashboard' ? '#059669' : '#6B7280'} />
              <Text style={activeTab === 'dashboard' ? styles.activeNavText : styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, activeTab === 'logger' && styles.activeNavButton]}
              onPress={() => setActiveTab('logger')}
            >
              <Leaf size={20} color={activeTab === 'logger' ? '#059669' : '#6B7280'} />
              <Text style={activeTab === 'logger' ? styles.activeNavText : styles.navText}>Logger</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, activeTab === 'missions' && styles.activeNavButton]}
              onPress={() => setActiveTab('missions')}
            >
              <Target size={20} color={activeTab === 'missions' ? '#059669' : '#6B7280'} />
              <Text style={activeTab === 'missions' ? styles.activeNavText : styles.navText}>Missions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, activeTab === 'leaderboard' && styles.activeNavButton]}
              onPress={() => setActiveTab('leaderboard')}
            >
              <Trophy size={20} color={activeTab === 'leaderboard' ? '#059669' : '#6B7280'} />
              <Text style={activeTab === 'leaderboard' ? styles.activeNavText : styles.navText}>Leaders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, activeTab === 'profile' && styles.activeNavButton]}
              onPress={() => setActiveTab('profile')}
            >
              <User size={20} color={activeTab === 'profile' ? '#059669' : '#6B7280'} />
              <Text style={activeTab === 'profile' ? styles.activeNavText : styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafContainer: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#059669',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 12,
  },
  levelText: {
    color: '#065F46',
    marginRight: 8,
  },
  xpText: {
    color: '#065F46',
  },
  content: {
    flex: 1,
  },
  bottomSafe: {
    backgroundColor: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
  },
  navButton: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop:5,
    marginTop:6,
  },
  activeNavButton: {
    backgroundColor: '#D1FAE5',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    color: '#6B7280',
  },
  activeNavText: {
    fontSize: 10,
    color: '#059669',
  },
});
