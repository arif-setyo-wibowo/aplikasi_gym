// src/screens/Detail.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const DetailScreen = () => {
  return (
    <ImageBackground 
    source={require('../../assets/images/situp.jpg')} 
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Latih otot perut Anda dengan melakukan latihan yang tepat! Di sini, Anda dapat menemukan langkah-langkah dan teknik yang benar untuk melatih otot perut secara efektif, serta manfaat kesehatan yang akan Anda dapatkan.
          </Text>
          <Text style={styles.subTitle}>Cara Melatih Otot Perut:</Text>
          <Text style={styles.benefit}>✔ Lakukan crunch secara perlahan dan terkendali</Text>
          <Text style={styles.benefit}>✔ Cobalah plank untuk memperkuat otot inti</Text>
          <Text style={styles.benefit}>✔ Tambahkan leg raises untuk melatih otot perut bagian bawah</Text>
          <Text style={styles.benefit}>✔ Jangan lupakan latihan kardio untuk membantu mengurangi lemak perut</Text>

          <Text style={styles.subTitle}>Manfaat Latihan:</Text>
          <Text style={styles.benefit}>✔ Meningkatkan kebugaran fisik</Text>
          <Text style={styles.benefit}>✔ Meningkatkan kesehatan mental</Text>
          <Text style={styles.benefit}>✔ Membantu mengurangi stres</Text>
          <Text style={styles.benefit}>✔ Meningkatkan energi dan produktivitas</Text>
        </View>
      </ScrollView>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start', 
  },
  backgroundImage: {
    opacity: 0.6, 
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    marginTop: 20,
    backgroundColor: '#fff', 
    borderRadius: 10,
    padding: 15,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  benefit: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
});

export default DetailScreen;
