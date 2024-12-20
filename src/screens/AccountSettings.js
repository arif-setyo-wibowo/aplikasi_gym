import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

export default function AccountSettings() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('username')}  >
          <Ionicons name="person-outline" size={20} color="white" />
          <Text style={styles.optionText}>Ubah Username</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('email')}>
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.optionText}>Ubah Email</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('password')}>
          <Ionicons name="lock-closed-outline" size={20} color="white" />
          <Text style={styles.optionText}>Ubah Password</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.deleteText}>Delete Account</Text>
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
