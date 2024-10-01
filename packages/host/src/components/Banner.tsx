import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const Banner: React.FC = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/fotos-premium/dia-ozono_1103365-18250.jpg' }} // Puedes usar una URL de imagen
      style={styles.bannerContainer}
      imageStyle={{ borderRadius: 20 }} 
    >
      <View style={styles.overlay}>
        <Text style={styles.bannerText}>
          Una SuperApp que brinda servicios de IA agrícola!!
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
});
