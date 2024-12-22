import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditRoutine = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { routineId, routineName } = route.params;

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (routineId) {
      fetchExercises(routineId);
    }
  }, [routineId]);

  const fetchExercises = async (routineId) => {
    try {
      const ip = await AsyncStorage.getItem('ip');
      const response = await fetch(`http://${ip}:8080/routine-exercise`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'routine_id': routineId,
        },
      });
  
      if (response.status === 200) {
        const result = await response.json();  
        if (result.data && Array.isArray(result.data)) {
          const formattedExercises = result.data.map((item) => {
            const setArray = item.set.split(','); 
            const weightArray = item.weight.split(',');
            const repetitionArray = item.repetition.split(',');
  
            const sets = setArray.map((setValue, index) => ({
              id: parseInt(setValue, 10),
              kg: weightArray[index] || '',
              reps: repetitionArray[index] || '',
            }));
  
            return {
              id: item.exercise_id.toString(),
              name: item.exercise?.name || 'Unknown Exercise',
              image: item.exercise?.image || 'https://via.placeholder.com/50',
              sets: sets,
            };
          });
  
          setExercises(formattedExercises);
        } else {
          Alert.alert('Error', 'Data latihan tidak ditemukan.');
        }
      } else {
        Alert.alert('Error', 'Gagal mengambil data latihan');
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
    }
  };

  const addExercise = () => {
    const newExercise = {
      id: Date.now().toString(),
      name: 'New Exercise',
      image: 'https://via.placeholder.com/50',
      sets: [{ id: 1, kg: '', reps: '' }],
    };
    setExercises((prevExercises) => [...prevExercises, newExercise]);
  };

  const updateSet = (exerciseId, setId, field, value) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.map((set) =>
            set.id === setId ? { ...set, [field]: value } : set
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      })
    );
  };

  const addSet = (exerciseId) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSet = { id: exercise.sets.length + 1, kg: '', reps: '' };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };

  const saveRoutine = () => {
    console.log('Routine saved:', exercises);
    Alert.alert('Success', 'Routine disimpan!');
  };

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseNote}>Catatan</Text>
        </View>
        <TouchableOpacity onPress={() => deleteExercise(item.id)}>
          <Icon name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.setRow}>
        <Text style={styles.setColumn}>SET</Text>
        <Text style={styles.setColumn}>KG</Text>
        <Text style={styles.setColumn}>REPS</Text>
      </View>
      {item.sets.map((set) => (
        <View key={set.id} style={styles.setDataRow}>
           <TextInput
                style={[styles.setDataInput, { textAlign: 'center', color: '#fff' }]}
                value={String(set.id)} 
                editable={false} 
              />
          <TextInput
            style={styles.setDataInput}
            keyboardType="numeric"
            placeholder="-"
            placeholderTextColor="#fff"
            value={set.kg}
            onChangeText={(value) => updateSet(item.id, set.id, 'kg', value)}
          />
          <TextInput
            style={styles.setDataInput}
            keyboardType="numeric"
            placeholder="-"
            placeholderTextColor="#fff"
            value={set.reps}
            onChangeText={(value) => updateSet(item.id, set.id, 'reps', value)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(item.id)}>
        <Text style={styles.addSetText}>+ Add Set</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercise"
        placeholderTextColor="#888"
        value={routineName}
      />
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
        contentContainerStyle={styles.exerciseList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addExerciseButton} onPress={addExercise}>
          <Text style={styles.addExerciseText}>+ Add exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveRoutine}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
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
  exerciseList: {
    paddingBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseNote: {
    color: '#888',
    fontSize: 14,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  setColumn: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  setDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  setDataInput: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  addSetButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addSetText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  addExerciseButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  addExerciseText: {
    color: '#4DA6FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4DA6FF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditRoutine;
