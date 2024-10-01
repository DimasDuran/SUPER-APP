import React from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const KeysFeaturesScreen = ({ route }) => {
  const { item } = route.params; // Obtén el objeto que se pasa

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      
      <Text variant="headlineLarge" style={styles.title}>{item.title}</Text>
      
      <Text variant="bodyLarge" style={styles.description}>
        {item.description}
      </Text>

      {/* Iterar sobre bodyInformation si existe */}
      {Array.isArray(item.bodyInformation) && item.bodyInformation.length > 0 && (
        item.bodyInformation.map((stepItem, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text variant="bodyMedium" style={styles.stepTitle}>{stepItem.step}</Text>
            <Image source={{ uri: stepItem.image }} style={styles.stepImage} />
            <Text variant="bodySmall" style={styles.stepDescription}>{stepItem.description}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default KeysFeaturesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    lineHeight: 22,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  stepDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
