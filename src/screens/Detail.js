import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

export default function DetailScreen() {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>

      {/* Routine Title */}
      <TextInput 
        style={styles.input} 
        placeholder="Routine title" 
        placeholderTextColor="#888" 
      />

      {/* Icon and Text */}
      <View style={styles.iconContainer}>
        <Ionicons name="barbell-outline" size={48} color="#888" />
        <Text style={styles.subtitle}>
          Get started by adding an exercise to your routine.
        </Text>
      </View>

      {/* Add Exercise Button */}
      <TouchableOpacity style={styles.addButton}  onPress={() => navigation.navigate('Latihan')}>
        <Text style={styles.addButtonText}>+ Add exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Background hitam
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelText: {
    color: '#FFF',
    fontSize: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveText: {
    color: '#4DA6FF', // Warna biru
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1A1A1A', // Warna abu-abu gelap
    color: '#FFF',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4DA6FF', // Warna biru
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
