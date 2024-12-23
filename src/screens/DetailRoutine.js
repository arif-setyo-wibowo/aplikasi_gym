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
                equipment: item.exercise.equipment,
                how:item.exercise.how,
                muscle:item.exercise.muscle
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
      <TouchableOpacity
                onPress={() => navigation.navigate('detailLatihan', { exercise: item })}
                style={styles.detailButton}
              >
      <View style={styles.exerciseHeader}>
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
        <Text style={[styles.exerciseName, styles.orangeText]}>
          {item.name} ({item.equipment})
        </Text>
      </View>
      </TouchableOpacity>
      <View style={styles.setHeader}>
        <Text style={styles.setColumn}>SET</Text>
        <Text style={styles.setColumn}>KG</Text>
        <Text style={styles.setColumn}>REPS</Text>
      </View>
      {item.sets.map((set, index) => (
        <View key={index} style={styles.setRow}>
          <Text style={styles.setColumnData}>{set.set}</Text>
          <Text style={styles.setColumnData}>{set.kg}</Text>
          <Text style={styles.setColumnData}>{set.reps}</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('EditRoutine', { routineId, routineName })}>
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
    backgroundColor: "#111214",
    paddingTop: 20,
  },
  headerContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
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
    color: "#aaa",
    fontSize: 18,
    fontWeight: "bold",
  },
  editRoutineText: {
    color: "#f57c00",
    fontSize: 14,
    fontWeight: "bold",
  },
  exerciseList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orangeText: {
    color: "#f57c00",
  },
  setHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    marginTop: 5,
  },
  setColumn: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    width: "33%",
  },
  setColumnData: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    width: "33%",
    marginTop:3,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
});

export default App;
