import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/Settings';
import ExploreScreen from './src/screens/Explore';
import DetailScreen from './src/screens/Detail';
import LatihanScreen from './src/screens/Latihan';
import LatihanTambahScreen from './src/screens/LatihanTambah';
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
          focus: () => setShowBottomBar(true), 
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
          blur: () => setShowBottomBar(true), 
        }}
      />
      <Stack.Screen 
        name="DetailSettings" 
        component={DetailSScreen} 
        options={{ title: 'Setelan Umum'}}
        listeners={{
          focus: () => setShowBottomBar(false), 
          blur: () => setShowBottomBar(true), 
        }}
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
              <Ionicons name="search" size={24} color="#fffff" />
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
        <Ionicons name="barbell" size={24} color={activeTab === 'HomeScreen' ? '#ffffff' : 'gray'} />
        <Text style={{ color: activeTab === 'HomeScreen' ? '#ffffff' : 'gray' }}>Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Explore' && styles.activeTab]} 
        onPress={() => {
          setActiveTab('Explore');
          navigation.navigate('Explore');
        }}
      >
        <Ionicons name="person-circle-outline" size={24} color={activeTab === 'Explore' ? '#ffffff' : 'gray'} />
        <Text style={{ color: activeTab === 'Explore' ? '#ffffff' : 'gray' }}>Profile</Text>
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    flex: 1,
  },
  activeTab: {

  }
});
