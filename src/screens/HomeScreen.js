import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [routines, setRoutines] = useState([
    { id: 1, name: 'Tes', details: 'Bench Press (Dumbbell), Bicep Curl (Dumbbell)' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const openModal = (routine) => {
    setSelectedRoutine(routine);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRoutine(null);
    setModalVisible(false);
  };

  const updateRoutine = (newName) => {
    if (selectedRoutine) {
      setRoutines((prev) =>
        prev.map((routine) =>
          routine.id === selectedRoutine.id
            ? { ...routine, name: newName }
            : routine
        )
      );
      closeModal();
    }
  };

  const deleteRoutine = () => {
    if (selectedRoutine) {
      setRoutines((prev) =>
        prev.filter((routine) => routine.id !== selectedRoutine.id)
      );
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      {/* Routines */}
      <View style={styles.routines}>
        <Text style={styles.sectionTitle}>Routines</Text>
        <View style={styles.routineButtons}>
          <TouchableOpacity
            style={styles.routineButton}
            onPress={() => navigation.navigate('Latihan')}
          >
            <Icon name="document-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>New Routine</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Routines */}
      <View style={styles.myRoutines}>
        <Text style={styles.sectionTitle}>My Routines</Text>
        {routines.map((routine) => (
          <View key={routine.id} style={styles.routineItem}>
            <View style={styles.routineTextContainer}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineDetails}>{routine.details}</Text>
            </View>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => openModal(routine)}
            >
              <Icon name="ellipsis-horizontal" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Tombol Close Modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Routine</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Detail Edit Routine</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Routine</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Routine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
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
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  myRoutines: {
    marginTop: 20,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  routineTextContainer: {
    flex: 1,
  },
  routineName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routineDetails: {
    color: '#aaa',
    fontSize: 14,
  },
  moreButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#333',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    gap: 10, 
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#1bc307',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5, 
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5, 
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
    backgroundColor: '#444',
    borderRadius: 15,
  },
});
