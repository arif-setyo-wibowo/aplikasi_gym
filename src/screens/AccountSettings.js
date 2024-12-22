import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountSettings() {
  const navigation = useNavigation(); 

  // Fungsi untuk logout dengan menggunakan fetch
  const handleLogout = async () => {
    try {
      // Ambil user ID dari AsyncStorage
      const userid = await AsyncStorage.getItem('id') // Ambil ID pengguna dari AsyncStorage
      const ip = await AsyncStorage.getItem('ip');
      //console.log(userid);
      
      if (!userid) {
        console.log("User ID tidak ditemukan");
        return;
      }
      // Kirim request logout ke server menggunakan fetch
      const response = await fetch(`http://${ip}:8080/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
        }), // Kirim ID pengguna dalam body
      });

      const data = await response.json();

      if (response.ok) {
        // Menghapus user ID dan token dari AsyncStorage setelah logout
        await AsyncStorage.removeItem('Id');
        await AsyncStorage.removeItem('token');

        // Arahkan ke halaman login setelah logout berhasil
        navigation.navigate('LoginScreen');
      } else {
        console.error('Logout failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('username')}  >
          <Ionicons name="person-outline" size={20} color="white" />
          <Text style={styles.optionText}>Ubah Username</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('email')} >
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.optionText}>Ubah Email</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('password')} >
          <Ionicons name="lock-closed-outline" size={20} color="white" />
          <Text style={styles.optionText}>Ubah Password</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.deleteText}>Logout Account</Text>
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
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  deleteText: {
    color: '#b31919',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
