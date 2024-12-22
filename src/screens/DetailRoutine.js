import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';

const exercises = [
  {
    id: "1",
    name: "Bench Press (Dumbbell)",
    image: "https://via.placeholder.com/50",
    sets: [{ set: 1, kg: 2, reps: 3 }],
  },
  {
    id: "2",
    name: "Bicep Curl (Dumbbell)",
    image: "https://via.placeholder.com/50",
    sets: [
      { set: 1, kg: 2, reps: 3 },
      { set: 2, kg: 2, reps: 3 },
    ],
  },
];

const App = () => {
  const navigation = useNavigation();
  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Image source={{ uri: item.image }} style={styles.exerciseImage} />
        <Text
          style={[
            styles.exerciseName,styles.blueText,
          ]}
        >
          {item.name}
        </Text>
      </View>
      <View style={styles.setHeader}>
        <Text style={styles.setColumn}>SET</Text>
        <Text style={styles.setColumn}>KG</Text>
        <Text style={styles.setColumn}>REPS</Text>
      </View>
      {item.sets.map((set) => (
        <View key={set.set} style={styles.setRow}>
          <Text style={styles.setColumn1}>{set.set}</Text>
          <Text style={styles.setColumn1}>{set.kg}</Text>
          <Text style={styles.setColumn1}>{set.reps}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Tes</Text>
        <Text style={styles.subtitle}>Created by jupri</Text>
      </View>

      {/* Exercise List */}
      <View style={styles.headerRow}>
        <Text style={styles.routineName}>Exercises</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditRoutine')}>
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
  startButton: {
    marginTop: 10,
    backgroundColor: "#4DA6FF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    fontSize: 18
  },
  editRoutineText: {
    color: "#4DA6FF",
    fontSize: 14
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
    fontWeight: '600'
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
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
});

export default App;
