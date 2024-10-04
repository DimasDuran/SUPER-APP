import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  BlogNav: undefined;
};

type BlogsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BlogNav'
>;

const CardPromo: React.FC = () => {
  const navigation = useNavigation<BlogsScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('BlogNav');
  };

  return (
    <Card mode="contained" style={styles.card} onPress={handlePress}>
      <Card.Cover 
        source={{ 
          uri: 'https://www.inesalud.com/sites/default/files/styles/article_mob/public/2024-07/futuro%20verde.png.webp?itok=pfXnlHeW' 
        }} 
        style={styles.cardImage}
      />
      <Card.Title
        title="Artículos sobre Enfermedades Agrícolas"
        subtitle="Explora los últimos artículos sobre enfermedades que afectan a las plantaciones en la región."
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, 
  },
  cardImage: {
    height: 150, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
  },
});

export default CardPromo;
