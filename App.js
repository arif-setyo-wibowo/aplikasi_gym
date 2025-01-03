import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import DetailLatihanScreen from './src/screens/DetailLatihan';
import AccountSettings from './src/screens/AccountSettings';
import LatihanScreen from './src/screens/Latihan';
import LatihanTambahScreen from './src/screens/LatihanTambah';
import UsernameScreen from './src/screens/Username';
import testScreen from './src/screens/EmailScreen';
import PasswordScreen from './src/screens/Password';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DetailRoutineScreen from './src/screens/DetailRoutine';
import EditRoutineScreen from './src/screens/EditRoutine';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function MyStack({ setActiveTab, setShowBottomBar, isLoggedIn  }) {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "HomeScreen" : "LoginScreen"}
    screenOptions={{
      headerStyle: { backgroundColor: '#1e1e1e' },
      headerTintColor: '#fff',
    }}>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false, headerLeft: () => null }}
        listeners={{
          tabPress: () => setActiveTab('HomeScreen'),
          focus: () => setShowBottomBar(true)
        }}
      />
      <Stack.Screen 
        name="Latihan" 
        component={LatihanScreen} 
        options={{ 
          title: 'Buat Latihan', 
        }}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
        }}
      />
      <Stack.Screen 
        name="LatihanTambah"
        component={LatihanTambahScreen} 
        options={{ 
          title: 'Tambah Latihan', 
        }}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true)
        }}
      />

      <Stack.Screen 
        name="AccountSettings" 
        component={AccountSettings} 
        options={{ 
          headerShown: false,
          headerLeft: () => null
        }}
        listeners={{
          tabPress: () => setActiveTab('AccountSettings'),
          focus: () => setShowBottomBar(true)
        }}
      />

      <Stack.Screen 
        name="username" 
        component={UsernameScreen} 
        options={{ 
          title: 'Ubah Username'
        }}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true) 
        }}
      />
      
      <Stack.Screen 
        name="password" 
        component={PasswordScreen} 
        options={{ 
          title: 'Ubah Password'
        }}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true) 
        }}
      />

      <Stack.Screen 
        name="email" 
        component={testScreen} 
        options={{ 
          title: 'Ubah Email'
        }}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true)
        }}
      />

      <Stack.Screen 
        name="detailLatihan"
        component={DetailLatihanScreen}
        options={{ title: 'Detail latihan' }} 
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true)
        }} 
      />

      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ title: 'Login', headerShown: false ,}} 
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
        }}
      />

      <Stack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        options={{ title: 'Register', headerShown: false }} 
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
        }}
      />

      <Stack.Screen 
        name="DetailRoutine" 
        component={DetailRoutineScreen} 
        options={{ title: 'Detail Routine', headerShown: true }} 
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
        }}
      />


      <Stack.Screen 
        name="EditRoutine" 
        component={EditRoutineScreen} 
        options={{ title: 'Edit Routine', headerShown: true }} 
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
        }}
      />

    </Stack.Navigator>
  );
}



const BottomBar = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'HomeScreen' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('HomeScreen');
          navigation.navigate('HomeScreen');
        }}
      >
        <Ionicons name="barbell" size={24} color={activeTab === 'HomeScreen' ? '#ffffff' : 'gray'} />
        <Text style={{ color: activeTab === 'HomeScreen' ? '#ffffff' : 'gray' }}>Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'AccountSettings' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('AccountSettings');
          navigation.navigate('AccountSettings');
        }}
      >
        <Ionicons name="person-circle-outline" size={24} color={activeTab === 'AccountSettings' ? '#ffffff' : 'gray'} />
        <Text style={{ color: activeTab === 'AccountSettings' ? '#ffffff' : 'gray' }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('HomeScreen');
  const [showBottomBar, setShowBottomBar] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeIP = async () => {
      try {
        await AsyncStorage.removeItem('ip');
        const ip = await AsyncStorage.getItem('ip');
        if (!ip) {
          await AsyncStorage.setItem('ip', '192.168.0.102');
          console.log('IP default disimpan ke AsyncStorage.');
        }
      } catch (error) {
        console.error('Gagal menyimpan IP ke AsyncStorage:', error);
      }
    };

    initializeIP();
  }, []);

  useEffect(() => {
    // Fungsi untuk memeriksa status login dan token
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Mengambil token dari AsyncStorage
        const ip = await AsyncStorage.getItem('ip'); // Mengambil IP dari AsyncStorage
        if (token) {
          const response = await fetch(`http://${ip}:8080/check_session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
          });
          const data = await response.json();
          
          if (response.ok && data.status === 'valid') {
            setIsLoggedIn(true); // Jika token valid, set login status
          } else {
            setIsLoggedIn(false); // Jika tidak valid, set login status ke false
          }
        } else {
          setIsLoggedIn(false); // Jika token tidak ada
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    // Simulasi login berhasil dan menyimpan token
    const token = 'your_token_here'; // Gantilah dengan token yang didapatkan setelah login
    await AsyncStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1E1E2C" barStyle="light-content" />
      <MyStack 
        setActiveTab={setActiveTab} 
        setShowBottomBar={setShowBottomBar} 
      />
      {showBottomBar && <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1e1e1e',
  },
  tab: {
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    flex: 1,
  },
  activeTab: {

  }
});
