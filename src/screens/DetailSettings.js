import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="alarm-outline" size={24} color="#202124" style={styles.icon} />
          <Text style={styles.settingLabel}>Ingatkan saya untuk berlatih setiap hari</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="cube-outline" size={24} color="#202124" style={styles.icon} />
          <Text style={styles.settingLabel}>Satuan Metrik & imperal</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="phone-portrait-outline" size={24} color="#202124" style={styles.icon} />
          <Text style={styles.settingLabel}>Biarkan layar menyala</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Ionicons name="eye-outline" size={24} color="#202124" style={styles.icon} />
          <Text style={styles.settingLabel}>Kebijakan privasi</Text>
        </View>
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
    fontSize: 14,
  },
  icon: {
    borderRadius: 12, 
    backgroundColor: '#fff', 
    padding: 5, 
    marginRight: 10, 
  }
});

export default SettingsScreen;
