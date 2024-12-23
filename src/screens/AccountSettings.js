import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountSettings() {
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    try {
      const userid = await AsyncStorage.getItem('id');
      const ip = await AsyncStorage.getItem('ip');
      
      if (!userid) {
        console.log("User ID tidak ditemukan");
        return;
      }

      const response = await fetch(`http://${ip}:8080/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.removeItem('Id');
        await AsyncStorage.removeItem('token');

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
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('username')}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="person-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.optionText}>Ubah Username</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('email')}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="mail-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.optionText}>Ubah Email</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('password')}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.optionText}>Ubah Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // Warna dasar gelap
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a', // Warna latar untuk setiap opsi
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  optionIconContainer: {
    backgroundColor: '#444', // Warna latar belakang ikon
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#b31919',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});