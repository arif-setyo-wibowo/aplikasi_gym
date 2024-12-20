import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 

export default function HomeScreen() {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      {/* Quick Start */}
      {/* <View style={styles.quickStart}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <TouchableOpacity style={styles.quickStartButton}>
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.buttonText}>Start Empty Workout</Text>
        </TouchableOpacity>
      </View> */}

      {/* Routines */}
      <View style={styles.routines}>
        <Text style={styles.sectionTitle}>Routines</Text>
        <View style={styles.routineButtons}>
          <TouchableOpacity style={styles.routineButton} onPress={() => navigation.navigate('Detail')}>
            <Icon name="document-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>New Routine</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.routineButton}>
            <Icon name="search-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Explore Routines</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  quickStart: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  quickStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  routines: {
    marginTop: 20,
  },
  routineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routineButton: {
    backgroundColor: '#222',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  activeNavText: {
    color: '#007bff',
  },
});
