import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';

const LatihanTambah = () => {
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Bench Press (Dumbbell)', image: 'https://via.placeholder.com/50', restTimer: 'OFF', sets: [{ id: 1, kg: '', reps: '' }] },
    { id: '2', name: 'Bicep Curl (Dumbbell)', image: 'https://via.placeholder.com/50', restTimer: 'OFF', sets: [{ id: 1, kg: '', reps: '' }] },
  ]);

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

  const deleteExercise = (exerciseId) => {
    setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== exerciseId));
  };

  const addExercise = () => {
    const newExercise = {
      id: Date.now().toString(),
      name: 'New Exercise',
      image: 'https://via.placeholder.com/50',
      restTimer: 'OFF',
      sets: [{ id: 1, kg: '', reps: '' }],
    };
    setExercises((prevExercises) => [...prevExercises, newExercise]);
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
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.restTimer}>Rest Timer: {item.restTimer}</Text>
      <View style={styles.setRow}>
        <Text style={styles.setColumn}>SET</Text>
        <Text style={styles.setColumn}>KG</Text>
        <Text style={styles.setColumn}>REPS</Text>
      </View>
      {item.sets.map((set) => (
        <View key={set.id} style={styles.setDataRow}>
          <Text style={styles.setData}>{set.id}</Text>
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
  deleteText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
  restTimer: {
    color: '#4DA6FF',
    fontSize: 14,
    marginBottom: 8,
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
  setData: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
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

export default LatihanTambah;
