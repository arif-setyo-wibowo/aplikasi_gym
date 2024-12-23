import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Replace with your actual image path
const localImage1 = require('../../assets/images/geger.jpg');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [routines, setRoutines] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const ip = await AsyncStorage.getItem('ip');
        const userid = await AsyncStorage.getItem('id');
        const response = await fetch(`http://${ip}:8080/routine`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'user_id': userid,
          },
        });
        const result = await response.json();
        setRoutines(result.data.routines || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch routines.');
      }
    };
    fetchRoutines();
  }, []);

  const showModal = (routine) => {
    setSelectedRoutine(routine);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedRoutine(null);
    });
  };

  const deleteRoutine = async () => {
    if (selectedRoutine) {
      try {
        const ip = await AsyncStorage.getItem('ip');
        const response = await fetch(`http://${ip}:8080/delete-routine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'id': selectedRoutine.id,
          },
        });
        if (response.status === 200) {
          setRoutines((prev) => prev.filter((routine) => routine.id !== selectedRoutine.id));
          hideModal();
          Alert.alert('Success', 'Routine deleted.');
        } else {
          Alert.alert('Error', 'Failed to delete routine.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while deleting the routine.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Featured Section */}
      <ImageBackground source={localImage1} style={styles.imageVertikal}>
        <View style={styles.overlayVertikal}>
          <View style={styles.textContainerVertikal}>
            <Text style={styles.imageTextVertikal}>Menjadi aktif, jaga</Text>
            <Text style={styles.imageTextVertikal}>kebugaran</Text>
            <Text style={styles.imageTextMiniVertikal}>150 menit per minggu</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Content Below Image */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Routines</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Latihan')}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.addButtonText}>Add Routine</Text>
        </TouchableOpacity>
      </View>

      {/* Your Routines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Routines</Text>
        {routines.map((routine) => (
          <TouchableOpacity
            key={routine.id}
            style={styles.routineCard}
            onPress={() =>
              navigation.navigate('DetailRoutine', { routineId: routine.id, routineName: routine.name })
            }
          >
            <Text style={styles.routineName}>{routine.name}</Text>
            <TouchableOpacity onPress={() => showModal(routine)}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
              <Text style={styles.modalTitle}>{selectedRoutine?.name}</Text>
              <TouchableOpacity
                style={[styles.modalOption, styles.editOption]}
                onPress={() => {
                  hideModal();
                  navigation.navigate('EditRoutine', {
                    routineId: selectedRoutine.id,
                    routineName: selectedRoutine.name,
                  });
                }}
              >
                <Ionicons name="create-outline" size={20} color="#fff" style={styles.iconLeft} />
                <Text style={styles.modalOptionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalOption, styles.deleteOption]} onPress={deleteRoutine}>
                <Ionicons name="trash-outline" size={20} color="#fff" style={styles.iconLeft} />
                <Text style={styles.modalOptionText}>Delete</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111214',
  },
  header: {
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageVertikal: {
    width: '100%',
    height: 250,
    borderRadius: 0,
    marginBottom: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  overlayVertikal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  textContainerVertikal: {
    padding: 5,
  },
  imageTextVertikal: {
    color: 'white',
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  imageTextMiniVertikal: {
    color: '#c7c8c9',
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'left',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f57c00',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  routineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  routineName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#444',
    paddingLeft:15,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  deleteOption: {
    backgroundColor: '#ff3333',
  },
});