import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Star, MapPin, Phone, MessageCircle } from 'lucide-react-native';
import { useTranslation } from '@/contexts/TranslationContext';
import { router } from 'expo-router';

const workers = [
  {
    id: 1,
    name: 'أحمد محمد',
    profession: 'كهربائي',
    rating: 4.8,
    reviewsCount: 156,
    distance: '2.5 km',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: true,
    certified: true,
    price: '3000 DZD',
    available: true,
    hiremeCoin: 450,
  },
  {
    id: 2,
    name: 'يوسف علي',
    profession: 'سمكري',
    rating: 4.6,
    reviewsCount: 89,
    distance: '1.8 km',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: false,
    certified: true,
    price: '2500 DZD',
    available: true,
    hiremeCoin: 320,
  },
  {
    id: 3,
    name: 'خالد بن سالم',
    profession: 'دهان',
    rating: 4.9,
    reviewsCount: 203,
    distance: '3.2 km',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: true,
    certified: false,
    price: '2800 DZD',
    available: false,
    hiremeCoin: 680,
  },
];

export default function WorkersScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('findWorkers')}</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchByNameOrProfession')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {['all', 'available', 'verified', 'certified'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, selectedFilter === filter && styles.activeFilterTab]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterTabText, selectedFilter === filter && styles.activeFilterTabText]}>
              {t(filter)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workers List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.workersList}>
        {filteredWorkers.map((worker) => (
          <TouchableOpacity
            key={worker.id}
            style={styles.workerCard}
            onPress={() => router.push(`/worker/${worker.id}`)}
          >
            <Image source={{ uri: worker.image }} style={styles.workerImage} />
            
            <View style={styles.workerInfo}>
              <View style={styles.workerHeader}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <View style={styles.badgesContainer}>
                  {worker.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.badgeText}>✓</Text>
                    </View>
                  )}
                  {worker.certified && (
                    <View style={styles.certifiedBadge}>
                      <Text style={styles.badgeText}>🏆</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Text style={styles.workerProfession}>{worker.profession}</Text>
              
              <View style={styles.ratingContainer}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.rating}>{worker.rating}</Text>
                <Text style={styles.reviewsCount}>({worker.reviewsCount})</Text>
                <MapPin size={12} color="#6B7280" style={styles.locationIcon} />
                <Text style={styles.distance}>{worker.distance}</Text>
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{worker.price}</Text>
                <View style={styles.hiremeContainer}>
                  <Text style={styles.hiremeText}>{worker.hiremeCoin} HM</Text>
                </View>
              </View>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.chatButton}>
                  <MessageCircle size={16} color="#3B82F6" />
                  <Text style={styles.chatButtonText}>{t('chat')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={16} color="#FFFFFF" />
                  <Text style={styles.callButtonText}>{t('call')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={[styles.statusIndicator, { backgroundColor: worker.available ? '#10B981' : '#EF4444' }]} />
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    marginLeft: 12,
    padding: 12,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
  },
  filterTabs: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  workersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  workerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  workerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  workerInfo: {
    flex: 1,
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  badgesContainer: {
    flexDirection: 'row',
  },
  verifiedBadge: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  certifiedBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  workerProfession: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  locationIcon: {
    marginLeft: 12,
  },
  distance: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  hiremeContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hiremeText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  chatButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 4,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  callButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  statusIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});