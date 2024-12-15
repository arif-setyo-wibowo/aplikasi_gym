import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const localImage1 = require('../../assets/images/situp.jpg');
const localImage2 = require('../../assets/images/push-up.jpg');
const localImage3 = require('../../assets/images/foot.jpg');
const localImage4 = require('../../assets/images/back.jpg');

export default function HomeScreen() {
  const navigation = useNavigation(); 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.roundedBoxHeader}>
          <Text style={styles.headerText}>Selamat Datang! Hari ini kesempatanmu untuk bersinar</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TANTANGAN  7x4</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.roundedBox1}>
            <Text style={styles.boxTextVertikal}>Seluruh</Text>
            <Text style={styles.boxTextVertikal}>Tubuh</Text>
            <Text style={styles.boxTextVertikal}>Tantangan</Text>
            <Text style={styles.boxTextVertikal}></Text>
            <Text style={styles.boxTextMiniVertikal}>Mulailah perjalanan membentuk tubuh dengan fokus pada semua kelompok otot dan bangun tubuh impianmu dalam 4 minggu!</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>MULAI</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.roundedBox2}>
            <Text style={styles.boxTextVertikal}>Tubuh Bagian</Text>
            <Text style={styles.boxTextVertikal}>bawah</Text>
            <Text style={styles.boxTextVertikal}>Tantangan</Text><Text style={styles.boxTextVertikal}></Text>
            <Text style={styles.boxTextMiniVertikal}>Hanya dalam 4 minggu, kuatkan kaki, tingkatkan kekuatan tubuh bagian bawah, dan tingkatkan kebugaran secara keseluruhan!</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText2}>MULAI</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleVertikal}>Pemula</Text>
        <View style={styles.verticalScroll}>
          <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
            <ImageBackground source={localImage1} style={styles.largeImage}>
              <View style={styles.overlay}>
                <View style={styles.textContainer}>
                  <Text style={styles.imageText}>Otot Perut Pemula</Text>
                  <Text style={styles.imageTextMini}>20 menit - 5 latihan</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <ImageBackground source={localImage2} style={styles.largeImage}>
            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>Dada pemula</Text>
                <Text style={styles.imageTextMini}>9 menit - 11 latihan</Text>
              </View>
            </View>
          </ImageBackground>

          <ImageBackground source={localImage3} style={styles.largeImage}>
            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>Kaki pemula</Text>
                <Text style={styles.imageTextMini}>26 menit - 27 latihan</Text>
              </View>
            </View>
          </ImageBackground>

          <ImageBackground source={localImage4} style={styles.largeImage}>
            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>Bahu & punggung pemula</Text>
                <Text style={styles.imageTextMini}>17 menit - 14 latihan</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 14,
  },
  roundedBoxHeader: {
    backgroundColor: '#f5f5f5', 
    padding: 15, 
    borderRadius: 15, 
    marginRight: 15,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row', 
  },
  roundedBox1: {
    backgroundColor: '#3336d1d9', 
    padding: 15, 
    width: 280,
    borderRadius: 15, 
    marginRight: 15, 
  },
  roundedBox2: {
    backgroundColor: '#39a2bdd9', 
    width: 280,
    padding: 15, 
    borderRadius: 15, 
    marginRight: 15, 
  },
  boxTextVertikal: {
    color: 'white',
    fontSize: 21,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'left', 
    textTransform: 'uppercase', 
  },
  boxTextMiniVertikal: {
    color: 'white',
    fontSize: 10,
    margin: 0,
    textAlign: 'left', 
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20, 
    paddingVertical: 7, 
    paddingHorizontal: 15, 
    alignItems: 'center', 
    marginTop: 10, 
    marginLeft:15,
    marginRight:15
  },
  buttonText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'skyblue',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitleVertikal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:15
  },
  verticalScroll: {
    flexDirection: 'column',
  },
  largeImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden', 
    justifyContent: 'flex-end', 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center', 
  },
  textContainer: {
    padding: 5,
  },
  imageText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  imageTextMini: {
    color: 'white',
    fontSize: 11,
    marginLeft: 5,
    textAlign: 'left',
    textTransform: 'uppercase'
  },
});
