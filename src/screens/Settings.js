import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 

const SettingsScreen = () => {
    
  const navigation = useNavigation(); 

  const handleLogout = () => {
    Alert.alert("Logout", "Anda yakin ingin logout?", [
      {
        text: "Batal",
        onPress: () => console.log("Logout dibatalkan"),
        style: "cancel"
      },
      { text: "Logout", onPress: () => console.log("User logged out") }
    ]);
  };

  const handlePremiumSignup = () => {
    Alert.alert("Daftar Premium", "Anda akan diarahkan untuk mendaftar premium.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.premiumButton} onPress={handlePremiumSignup}>
        <Text style={styles.premiumButtonText}>DAFTAR PREMIUM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="water-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.settingLabel}>Pengaturan Latihan</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#aaa" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('DetailSettings')} > 
        <View style={styles.settingContent}>
          <Ionicons name="settings-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.settingLabel}>Setelan Umum</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#aaa" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <View style={styles.settingContent}>
          <Ionicons name="person-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.settingLabel}>Logout</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  premiumButton: {
    backgroundColor: '#1349e1eb', 
    padding: 15,
    borderRadius: 35,
    alignItems: 'center',
    marginBottom: 20, 
  },
  premiumButtonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 18,
  },
  icon: {
    borderRadius: 12, 
    backgroundColor: 'skyblue', 
    padding: 5, 
    marginRight: 10, 
  },
});

export default SettingsScreen;
