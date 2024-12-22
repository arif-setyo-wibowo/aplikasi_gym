import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Harap isi semua kolom.');
      return;
    }
    
    try {
      const ip = await AsyncStorage.getItem('ip');
      console.log('Making request...');
      const response = await fetch(`http://${ip}:8080/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      
      //console.log('Response Status:', response.status); // Cek status
      const data = await response.json();
      //console.log('Response Data:', data); // Cek data respons

    
      if (response.ok) {
        Alert.alert('Berhasil', 'Pendaftaran berhasil!');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', data.message || 'Pendaftaran gagal.');
      }
    } catch (error) {
      console.error('Request failed:', error); // Menampilkan pesan error secara lebih jelas
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar</Text>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />


      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginLink}>
        <Text style={styles.loginLinkText}>Sudah punya akun? Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
  },
  loginLinkText: {
    color: '#007bff',
    fontSize: 16,
  },
});
