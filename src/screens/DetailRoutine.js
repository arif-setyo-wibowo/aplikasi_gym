import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [exercises, setExercises] = useState([]); 
  const navigation = useNavigation();
  const route = useRoute();
  const routineId = route.params?.routineId;
  const routineName = route.params?.routineName;
  const [username, setUsername] = useState('');

  useEffect(() => {
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
              const setArray = item.set.split(',').filter(val => val !== '');
              const weightArray = item.weight.split(',').filter(val => val !== '');
              const repetitionArray = item.repetition.split(',').filter(val => val !== '');
    
              const sets = setArray.map((setValue, index) => ({
                set: parseInt(setValue, 10),  
                kg: weightArray[index] ? parseInt(weightArray[index], 10) : '-',
                reps: repetitionArray[index] ? parseInt(repetitionArray[index], 10) : '-', 
              }));
    
              return {
                id: item.exercise_id.toString(), 
                name: item.exercise.name,
                image: item.exercise.image,
                sets: sets,
                equipment: item.exercise.equipment
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

    const loadUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername || 'User'); 
    };

    loadUsername();

    if (routineId) {
      fetchExercises(routineId);
    }
  }, [routineId]);

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
        <Text style={[styles.exerciseName, styles.blueText]}>
          {item.name} ({item.equipment})
        </Text>
      </View>
      <View style={styles.setHeader}>
        <Text style={styles.setColumn}>SET</Text>
        <Text style={styles.setColumn}>KG</Text>
        <Text style={styles.setColumn}>REPS</Text>
      </View>
      {item.sets.map((set, index) => (
        <View key={index} style={styles.setRow}>
          <Text style={styles.setColumn1}>{set.set}</Text>
          <Text style={styles.setColumn1}>{set.kg}</Text>
          <Text style={styles.setColumn1}>{set.reps}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{routineName}</Text>
        <Text style={styles.subtitle}>Created by {username}</Text>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.routineName}>Exercises</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditRoutine', { routineId: routineId, routineName: routineName })}>
          <Text style={styles.editRoutineText}>Edit Routine</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={exercises} 
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
        contentContainerStyle={styles.exerciseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  headerContainer: {
    paddingLeft: 20,
    alignItems: "start",
    marginBottom: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  routineName: {
    color: "#888",
    fontSize: 18,
  },
  editRoutineText: {
    color: "#4DA6FF",
    fontSize: 14,
  },
  exerciseList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  exerciseContainer: {
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  exerciseName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '600',
  },
  blueText: {
    color: "#4DA6FF",
  },
  setHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  setColumn: {
    color: "#888",
    fontSize: 14,
    width: "33%",
    textAlign: "center",
  },
  setColumn1: {
    color: "#fff",
    fontSize: 14,
    width: "33%",
    textAlign: "center",
    marginVertical: 5
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
});

export default App;
