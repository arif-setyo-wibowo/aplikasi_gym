import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Tambahkan library ikon
import { useNavigation } from '@react-navigation/native';

const LatihanScreen = () => {
  const navigation = useNavigation();
  const [selectedExercises, setSelectedExercises] = useState([]);

  const allExercises = [
    { id: '3', name: '21s Bicep Curl', muscle: 'Biceps', image: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Ab Scissors', muscle: 'Abdominals', image: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Ab Wheel', muscle: 'Abdominals', image: 'https://via.placeholder.com/50' },
    { id: '6', name: '21s Bicep Curl', muscle: 'Biceps', image: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Ab Scissors', muscle: 'Abdominals', image: 'https://via.placeholder.com/50' },
    { id: '8', name: 'Ab Wheel', muscle: 'Abdominals', image: 'https://via.placeholder.com/50' },
  ];

  const handleExerciseClick = (exercise) => {
    if (selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises(selectedExercises.filter((e) => e.id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const renderExerciseItem = ({ item }) => {
    const isSelected = selectedExercises.some((e) => e.id === item.id);
  
    return (
      <TouchableOpacity onPress={() => handleExerciseClick(item)} style={styles.exerciseItem}>
        {/* Gambar */}
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
  
        {/* Teks */}
        <View style={styles.exerciseTextContainer}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseMuscle}>
            {item.muscle} {item.type ? `(${item.type})` : ''}
          </Text>
        </View>

        {/* Ikon Pilih */}
        <Icon
          name={isSelected ? 'checkmark-circle' : 'refresh'}
          size={24}
          color={isSelected ? '#0F0' : '#4DA6FF'}
          style={styles.iconStyle}
        />

        {/* Ikon Detail */}
        <TouchableOpacity onPress={() => navigation.navigate('detailLatihan', { exercise: item })}>
          <Icon
            name="information-circle-outline"
            size={24}
            color="#4DA6FF"
            style={styles.detailIcon}
          />
        </TouchableOpacity>
  
        
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Search and Filters */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercise"
        placeholderTextColor="#888"
      />
      {/* <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Muscles</Text>
        </TouchableOpacity>
      </View> */}

      {/* All Exercises */}
      {/* <Text style={styles.sectionTitle}>All Exercises</Text> */}
      <FlatList
        data={allExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
      />

      {/* Add Exercises Button */}
      {selectedExercises.length > 0 && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('LatihanTambah')}>
          <Text style={styles.addButtonText}>
            Add {selectedExercises.length} {selectedExercises.length === 1 ? 'exercise' : 'exercises'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  filterText: {
    color: '#FFF',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  exerciseTextContainer: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFF',
    fontSize: 16,
  },
  exerciseMuscle: {
    color: '#888',
    fontSize: 14,
  },
  iconStyle: {
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#4DA6FF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LatihanScreen;
