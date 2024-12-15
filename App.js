import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/Settings';
import ExploreScreen from './src/screens/Explore';
import DetailScreen from './src/screens/Detail';
import DetailSScreen from './src/screens/DetailSettings';
import { useNavigation } from '@react-navigation/native'; 

const Stack = createStackNavigator();

function MyStack({ setActiveTab }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Latihan Pemula', headerLeft: () => null }}
        listeners={{
          tabPress: () => setActiveTab('HomeScreen'),
        }}
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Detail Latihan'}} 
      />
      
      <Stack.Screen 
        name="DetailSettings" 
        component={DetailSScreen} 
        options={{ title: 'Setelan Umum'}} 
      />

      <Stack.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ 
          title: 'Explore',
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }} 
              onPress={() => alert('Tombol pencarian ditekan!')} 
            >
              <Ionicons name="search" size={24} color="#1349e1eb" />
            </TouchableOpacity>
          ), 
        }}
        listeners={{
          tabPress: () => setActiveTab('Explore'),
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings', headerLeft: () => null }} 
        listeners={{
          tabPress: () => setActiveTab('Settings'),
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
        <Ionicons name="home" size={24} color={activeTab === 'HomeScreen' ? '#1349e1eb' : 'gray'} />
        <Text style={{ color: activeTab === 'HomeScreen' ? '#1349e1eb' : 'gray' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Explore' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('Explore');
          navigation.navigate('Explore');
        }}
      >
        <Ionicons name="compass" size={24} color={activeTab === 'Explore' ? '#1349e1eb' : 'gray'} />
        <Text style={{ color: activeTab === 'Explore' ? '#1349e1eb' : 'gray' }}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Settings' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('Settings');
          navigation.navigate('Settings');
        }}
      >
        <Ionicons name="settings" size={24} color={activeTab === 'Settings' ? '#1349e1eb' : 'gray'} />
        <Text style={{ color: activeTab === 'Settings' ? '#1349e1eb' : 'gray' }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('HomeScreen');

  return (
    <NavigationContainer>
      <MyStack setActiveTab={setActiveTab} />
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  activeTab: {

  }
});
