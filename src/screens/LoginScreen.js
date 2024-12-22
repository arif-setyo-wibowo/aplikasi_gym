import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Harap isi semua kolom.');
      return;
    }
  
    try {
      const ip = await AsyncStorage.getItem('ip');
      // Mengirim request POST ke endpoint login
      const response = await fetch(`http://${ip}:8080/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
      //console.log(data); 
  
      if (response.ok) {
        // Mengambil id dari respon
        const userId = data.data.id;
        const username = data.data.username;
        const email = data.data.email;
  
        // Menyimpan id ke AsyncStorage
        await AsyncStorage.setItem('id', userId.toString());
        await AsyncStorage.setItem('username', username.toString());
        await AsyncStorage.setItem('email', email.toString());
        console.log('Stored ID:', username,email);
       
        // Jika login berhasil
        Alert.alert('Berhasil', 'Login berhasil!');
        navigation.navigate('HomeScreen');

        
      } else {
        // Jika ada kesalahan dalam login
        Alert.alert('Error', data.rcMessage || 'Username atau password salah.');
      }
    } catch (error) {
      // Jika ada kesalahan dalam permintaan
      console.error(error);
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={styles.registerLink}>
        <Text style={styles.registerLinkText}>Belum punya akun? Daftar</Text>
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
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 10,
  },
  registerLinkText: {
    color: '#007bff',
    fontSize: 16,
  },
});
