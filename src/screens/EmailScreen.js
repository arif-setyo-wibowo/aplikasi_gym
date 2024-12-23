import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function EmailcreenS() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Ambil username dari AsyncStorage saat aplikasi dimulai
  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email'); // Ambil username dari AsyncStorage
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil username dari penyimpanan.');
      } finally {
        setLoading(false);
      }
    };

    getEmail();
  }, []);

  // Fungsi untuk mengupdate username
  const handleUpdate = async () => {
    try {
      const ip = await AsyncStorage.getItem('ip'); // Ambil IP dari AsyncStorage
      const userid = await AsyncStorage.getItem('id'); // Ambil User ID dari AsyncStorage

      const response = await fetch(`http://${ip}:8080/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'id': userid,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan username yang diperbarui ke AsyncStorage
        await AsyncStorage.setItem('email', email);
        Alert.alert('Success', 'Email berhasil diperbarui.');
      } else {
        Alert.alert('Error', data.message || 'Gagal memperbarui Email.');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat memperbarui Email.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Memuat email...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#888"
          />
          <Ionicons name="pencil-outline" size={20} color="#fff" style={styles.iconRight} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // Warna latar belakang sesuai tema
    padding: 20,
  },
  content: {
    flex: 0,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 5,
  },
  button: {
    backgroundColor: '#f57c00',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});