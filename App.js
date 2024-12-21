import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import DetailLatihanScreen from './src/screens/DetailLatihan';
import AccountSettings from './src/screens/AccountSettings';
import DetailScreen from './src/screens/Detail';
import LatihanScreen from './src/screens/Latihan';
import LatihanTambahScreen from './src/screens/LatihanTambah';
import UsernameScreen from './src/screens/Username';
import testScreen from './src/screens/EmailScreen';
import PasswordScreen from './src/screens/Password';
import DetailSScreen from './src/screens/DetailSettings';
import { useNavigation } from '@react-navigation/native'; 

const Stack = createStackNavigator();

function MyStack({ setActiveTab, setShowBottomBar }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Workout', headerLeft: () => null }}
        listeners={{
          tabPress: () => setActiveTab('HomeScreen'),
          focus: () => setShowBottomBar(true)
        }}
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ 
          title: 'Buat Workout', 
        }}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
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
        name="DetailSettings" 
        component={DetailSScreen} 
        options={{ title: 'Setelan Umum'}}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true)
        }}
      />

      <Stack.Screen 
        name="AccountSettings" 
        component={AccountSettings} 
        options={{ 
          title: 'Account Settings',
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
          title: 'Ubah Password'
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

  return (
    <NavigationContainer>
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
