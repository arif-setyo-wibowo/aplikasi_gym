import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailLatihan = () => {
  // Ambil parameter dari route
  const route = useRoute();
  const { exercise } = route.params;

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
          <Text style={styles.label}>Equipment: </Text>
          {exercise.equipment}
        </Text>
        <Text style={styles.muscleText}>
          <Text style={styles.label}>Muscle: </Text>
          {exercise.muscle}
        </Text>
      </View>

      {/* Langkah-langkah */}
      {exercise.how && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instruction}>{exercise.how}</Text>
        </View>
      )}
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