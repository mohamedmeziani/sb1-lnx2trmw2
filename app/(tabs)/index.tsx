import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { router } from 'expo-router';

const jobCategories = [
  { id: 1, name: 'electrician', icon: '⚡', color: '#FCD34D' },
  { id: 2, name: 'plumber', icon: '🔧', color: '#60A5FA' },
  { id: 3, name: 'painter', icon: '🎨', color: '#F87171' },
  { id: 4, name: 'construction', icon: '🏗️', color: '#A78BFA' },
  { id: 5, name: 'mechanic', icon: '🔩', color: '#34D399' },
  { id: 6, name: 'carpenter', icon: '🪚', color: '#FBBF24' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('welcome')}</Text>
            <Text style={styles.username}>{user?.name || t('guest')}</Text>
          </View>
          <TouchableOpacity style={styles.locationButton}>
            <MapPin size={20} color="#3B82F6" />
            <Text style={styles.locationText}>{t('location')}</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchWorkers')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Emergency Service */}
        <TouchableOpacity style={styles.emergencyCard}>
          <View style={styles.emergencyIconContainer}>
            <Text style={styles.emergencyIcon}>🚨</Text>
          </View>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>{t('emergencyService')}</Text>
            <Text style={styles.emergencySubtitle}>{t('available24h')}</Text>
          </View>
        </TouchableOpacity>

        {/* Job Categories */}
        <Text style={styles.sectionTitle}>{t('jobCategories')}</Text>
        <View style={styles.categoriesGrid}>
          {jobCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color + '20' }]}
              onPress={() => router.push(`/category/${category.name}`)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{t(category.name)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Workers */}
        <Text style={styles.sectionTitle}>{t('featuredWorkers')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {[1, 2, 3].map((worker) => (
            <TouchableOpacity key={worker} style={styles.workerCard}>
              <Image
                source={{ uri: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop` }}
                style={styles.workerImage}
              />
              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>{t('workerName')} {worker}</Text>
                <Text style={styles.workerProfession}>{t('electrician')}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ 4.8</Text>
                  <Text style={styles.distance}>2.5 km</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Jobs */}
        <Text style={styles.sectionTitle}>{t('recentJobs')}</Text>
        <View style={styles.jobsList}>
          {[1, 2].map((job) => (
            <TouchableOpacity key={job} style={styles.jobCard}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{t('electricalRepair')}</Text>
                <Text style={styles.jobDate}>2024-01-15</Text>
                <Text style={styles.jobStatus}>{t('completed')}</Text>
              </View>
              <View style={styles.jobActions}>
                <TouchableOpacity style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>{t('rate')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 2,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 12,
    color: '#3B82F6',
    marginLeft: 4,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#DC2626',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyIcon: {
    fontSize: 24,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#7F1D1D',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  categoryCard: {
    width: '45%',
    marginRight: '5%',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  featuredScroll: {
    paddingLeft: 20,
    marginBottom: 32,
  },
  workerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: 200,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  workerImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  workerProfession: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  distance: {
    fontSize: 12,
    color: '#6B7280',
  },
  jobsList: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  jobDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  jobStatus: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
    fontWeight: '600',
  },
  jobActions: {
    justifyContent: 'center',
  },
  rateButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rateButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});