import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LatihanScreen = () => {
  const navigation = useNavigation();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const ip = await AsyncStorage.getItem('ip');
        const response = await fetch(`http://${ip}:8080/exercise`);
        const result = await response.json();

        if (result.rc === "200" && result.data?.dataExer) {
          setAllExercises(result.data.dataExer);
          setFilteredExercises(result.data.dataExer);
        } else {
          console.error("Invalid response structure:", result);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      }
    };
  
    fetchExercises();
  }, []);

  useEffect(() => {
    const filtered = allExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchText.toLowerCase()) ||
      exercise.muscle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchText, allExercises]);

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
          <Text style={styles.exerciseName}>{item.name} ({item.equipment})</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('LatihanTambah', { selectedExercises })}>
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
