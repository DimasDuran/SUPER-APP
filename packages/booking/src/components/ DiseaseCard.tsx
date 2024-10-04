// DiseaseCard.tsx

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

interface DiseaseImage {
  image_url: string;
}

interface DiseaseCardProps {
  diseaseImages: DiseaseImage[];
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({ diseaseImages }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Cultivos Afectados</Text>
      <FlatList
        horizontal
        maxToRenderPerBatch={3}
        data={diseaseImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    height: 160,
    width: 200,
    borderRadius: 8,
  },
});

export default DiseaseCard;
