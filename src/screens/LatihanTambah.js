import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LatihanTambah = ({ route }) => {
  const { selectedExercises: initialSelectedExercises } = route.params || {}; 
  const [selectedExercises, setSelectedExercises] = useState(initialSelectedExercises || []);
  const [exercises, setExercises] = useState([]);
  const [routineTitle, setRoutineTitle] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedExercises.length > 0) {
      const formattedExercises = selectedExercises.map((exercise) => ({
        ...exercise,
        sets: [{ id: 1, kg: '', reps: '' }],
      }));
      setExercises(formattedExercises);
    }
  }, []);

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

  const saveRoutine = async () => {
    const updatedSelectedExercises = exercises.map((exercise) => {
      const setsData = exercise.sets.map((set) => set.id);
      const kgData = exercise.sets.map((set) => set.kg);
      const repsData = exercise.sets.map((set) => set.reps);
  
      return {
        ...exercise,
        sets: setsData.join(','),
        kg: kgData.join(','),
        reps: repsData.join(','),
        setsCount: exercise.sets.length,
      };
    });
  
    setSelectedExercises(updatedSelectedExercises);
  
    try {
      const ip = await AsyncStorage.getItem('ip');
      const userid = await AsyncStorage.getItem('id');
      const response = await fetch(`http://${ip}:8080/add-routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user_id': userid,
        },
        body: JSON.stringify({
          name: routineTitle,
        }),
      });
  
      if (response.ok) {
        const routineResponse = await response.json();
        const routineId = routineResponse.data;
  
        await saveRoutineExercises(updatedSelectedExercises, routineId);
        Alert.alert('Success', 'Routine and exercises saved!', [
      {
            text: 'OK',
            onPress: () => {
              navigation.navigate('HomeScreen'); 
            },
          },
        ]);
      } else {
        throw new Error('Failed to save routine');
      }
    } catch (error) {
      console.error('Error saving routine:', error);
      Alert.alert('Error', 'Failed to save routine. Please try again.');
    }
  };

  const deleteExercise = (exerciseId) => {
    setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== exerciseId));
  
    setSelectedExercises((prevSelectedExercises) => 
      prevSelectedExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };
  
  const saveRoutineExercises = async (exercises, routineId) => {
    try {
      const ip = await AsyncStorage.getItem('ip');
      const exerciseRequests = exercises.map((exercise) => {
        return fetch(`http://${ip}:8080/add-routine-exercise`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'routine_id': routineId,
            'exercise_id': exercise.id
          },
          body: JSON.stringify({
            set: exercise.sets,
            repetition: exercise.reps,
            weight: exercise.kg, 
            note: exercise.note || '',
          }),
        });
      });
  
      await Promise.all(exerciseRequests);
      console.log('Exercises saved successfully');
    } catch (error) {
      console.error('Error saving exercises:', error);
      Alert.alert('Error', 'Failed to save exercises. Please try again.');
    }
  };
  
  

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name} ({item.equipment})</Text>
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
        style={styles.routineTitle}
        placeholder="Routine Title"
        placeholderTextColor="#888"
        value={routineTitle}
        onChangeText={(text) => setRoutineTitle(text)}
      />

      <ScrollView contentContainerStyle={styles.exerciseList}>
        {exercises.map((item) => renderExerciseItem({ item }))}
      </ScrollView>

      <View style={styles.footer}>
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
    backgroundColor: '#111214', // Warna latar belakang sesuai tema
    padding: 16,
  },
  routineTitle: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#f57c00',
    borderWidth: 0, // Menonjolkan input dengan border oranye
  },
  exerciseList: {
    paddingBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Bayangan halus untuk elemen
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
  deleteText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 5,

  },
  setColumn: {
    color: '#AAA',
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
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 0,
    padding: 4,
  },
  addSetButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 0,
    borderColor: '#f57c00', // Border oranye untuk menonjolkan tombol
  },
  addSetText: {
    color: '#f57c00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#f57c00',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LatihanTambah;