import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetailLatihan = () => {
  const exercise = {
    name: 'Bench Press (Dumbbell)',
    image: 'https://via.placeholder.com/300',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    instructions: [
      'Grab a pair of dumbbells, sit on a flat gym bench, and place both weights on top of your thighs.',
      'Bring your shoulders back, engage your abs, take a breath, and flex your arms.',
      'Kick both dumbbells up with your thighs as you lie back.',
      'With your arms straight and dumbbells over your chest, dig your shoulder blades into the bench and place your feet flat on the floor.',
      'Take another breath and lower both dumbbells to your sides. Keep your elbows somewhat tucked.',
      'Lower the weights until your elbows are at torso level.',
      'Press both dumbbells to the starting position, bringing them together as you exhale.',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gambar dan Judul */}
      <View style={styles.contentContainer}>
        <Image source={{ uri: exercise.image }} style={styles.image} />
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      {/* Primary dan Secondary */}
      <View style={styles.muscleContainer}>
        <Text style={styles.muscleText}>
          <Text style={styles.label}>Primary: </Text>
          {exercise.primaryMuscle}
        </Text>
        <Text style={styles.muscleText}>
          <Text style={styles.label}>Secondary: </Text>
          {exercise.secondaryMuscles.join(', ')}
        </Text>
      </View>

      {/* Langkah-langkah */}
      <View style={styles.instructionsContainer}>
        {exercise.instructions.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.instruction}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  muscleContainer: {
    paddingLeft: 16,
    paddingBottom: 5,
  },
  muscleText: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  instructionsContainer: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  stepNumber: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  instruction: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
});

export default DetailLatihan;
