import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const LatihanScreen = () => {
  const navigation = useNavigation();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const allExercises = [
    { id: '3', name: '21s Bicep Curl', muscle: 'Biceps', image: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Ab Scissors', muscle: 'Abdominals', image: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Ab Wheel', muscle: 'Abdominals', image: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Dumbbell Bench Press', muscle: 'Chest', image: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Plank', muscle: 'Core', image: 'https://via.placeholder.com/50' },
    { id: '8', name: 'Deadlift', muscle: 'Back', image: 'https://via.placeholder.com/50' },
  ];

  const handleExerciseClick = (exercise) => {
    if (selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises(selectedExercises.filter((e) => e.id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const filteredExercises = allExercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExerciseItem = ({ item }) => {
    const isSelected = selectedExercises.some((e) => e.id === item.id);

    return (
      <TouchableOpacity
        onPress={() => handleExerciseClick(item)}
        style={[
          styles.exerciseItem,
          isSelected && styles.selectedExerciseItem, 
        ]}
      >
        {/* Gambar */}
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />

        {/* Teks */}
        <View style={styles.exerciseTextContainer}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseMuscle}>{item.muscle}</Text>
        </View>


        {/* Ikon Detail */}
        <TouchableOpacity
          onPress={() => navigation.navigate('detailLatihan', { exercise: item })}
          style={styles.detailButton}
        >
          <Icon name="information-circle-outline" size={24} color="#4DA6FF" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercise"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* List Latihan */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
      />

      {/* Tombol Tambah Latihan */}
      {selectedExercises.length > 0 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('LatihanTambah', { exercises: selectedExercises })}
        >
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
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingLeft: 8, // Tambahkan padding agar garis tidak menyentuh konten
  },
  selectedExerciseItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#4DA6FF', // Warna biru untuk garis
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
  detailButton: {
    marginLeft: 8,
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
