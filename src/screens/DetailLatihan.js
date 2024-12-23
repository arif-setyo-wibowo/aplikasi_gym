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

      {/* Informasi Equipment dan Muscle */}
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
          <Text style={styles.instructionsTitle}>How to Perform:</Text>
          {exercise.how.split('.').filter(step => step.trim() !== '').map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepText}>{index + 1}.{step.trim()}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111214', // Warna latar belakang sesuai tema
  },
  contentContainer: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  muscleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  muscleText: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#f57c00', // Aksen oranye untuk konsistensi dengan login/register
  },
  instructionsContainer: {
    padding: 16,
    backgroundColor: '#222',
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instruction: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 22,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
});

export default DetailLatihan;