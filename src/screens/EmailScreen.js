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
        <Text style={styles.loadingText}>Memuat username...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
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
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});
