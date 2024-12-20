import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const localImage1 = require('../../assets/images/bugar.jpg');
const localImage2 = require('../../assets/images/jogging.jpg');
const localImage3 = require('../../assets/images/foot.jpg');
const localImage4 = require('../../assets/images/back.jpg');

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={localImage2} style={styles.largeImageHeader}>
          <View style={styles.overlayHeader}>
            <View style={styles.textContainerHeader}>
              <Text style={styles.imageTextHeader}>Tabata 4 MENIT</Text>
              <Text style={styles.imageTextMiniHeader}>Latihan efektif untuk membakar lemak. Latihan berintesitas tinggi.</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pilihan untuk Anda</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <View style={styles.imageColumn}>
                <View style={styles.textContainer}>
                  <ImageBackground source={localImage1} style={styles.smallImage} />
                  <View style={styles.textContent}>
                    <Text style={styles.imageTextHorizontal}>HIIT Pembakar Lemak Perut</Text>
                    <Text style={styles.imageTextHorizontalMini}>13 menit - Menegah</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <ImageBackground source={localImage3} style={styles.smallImage} />
                  <View style={styles.textContent}>
                    <Text style={styles.imageTextHorizontal}>Buang lemak TANPA MELOMPAT</Text>
                    <Text style={styles.imageTextHorizontalMini}>13 menit - Menegah</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.imageColumn}>
                <View style={styles.textContainer}>
                  <ImageBackground source={localImage4} style={styles.smallImage} />
                  <View style={styles.textContent}>
                    <Text style={styles.imageTextHorizontal}>HIIT otot inti fantastis</Text>
                    <Text style={styles.imageTextHorizontalMini}>13 menit - Menegah</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <ImageBackground source={localImage2} style={styles.smallImage} />
                  <View style={styles.textContent}>
                    <Text style={styles.imageTextHorizontal}>HIIT menengah</Text>
                    <Text style={styles.imageTextHorizontalMini}>13 menit - Menegah</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.verticalScroll}>
          <ImageBackground source={localImage1} style={styles.imageVertikal}>
            <View style={styles.overlayVertikal}>
              <View style={styles.textContainerVertikal}>
                <Text style={styles.imageTextVertikal}>Menjadi aktif, jaga</Text>
                <Text style={styles.imageTextVertikal}>kebugaran</Text>
                <Text style={styles.imageTextMiniVertikal}>5 Latihan</Text>
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
    justifyContent: 'flex-end',
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
  horizontalContainer: {
    flexDirection: 'row', 
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  imageColumn: {
    flexDirection: 'column', 
    alignItems: 'flex-start',
  },
  textContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5, 
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc',
  },
  smallImage: {
    width: 85, 
    height: 85, 
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 10, 
  },
  textContent: {
    flexDirection: 'column', 
  },
  imageTextHorizontal: {
    fontSize: 14,
    padding: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  imageTextHorizontalMini: {
    fontSize: 14,
    padding: 5,
    color: 'black',
  },
  
  verticalScroll: {
    flexDirection: 'column',
  },
  imageVertikal: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  overlayVertikal: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
  },
  textContainerVertikal: {
    padding: 5,
  },
  imageTextVertikal: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  imageTextMiniVertikal: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    textAlign: 'left',
  },
  largeImageHeader: {
    width: '100%',
    height: 170,
    borderRadius: 15,
    overflow: 'hidden', 
    justifyContent: 'flex-end', 
  },
  overlayHeader: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  textContainerHeader: {
    padding: 5,
  },
  imageTextHeader: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
    paddingLeft: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  imageTextMiniHeader: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 5,
    textAlign: 'left',
  },
});
