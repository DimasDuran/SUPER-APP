import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type CardFeaturesProps = {
  item: {
    id: string;
    image: string;
    title: string;
    description: string;
  };
  index: number;
};

type RootStackParamList = {
  KessFeatures: undefined;
};

type MarketplaceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'KessFeatures'
>;


const CardFeatures: React.FC<CardFeaturesProps> = ({ item, index }) => {
  const navigation = useNavigation<MarketplaceScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate("KessFeatures", { item }); 
  };

  return (
    <Card mode="contained" style={styles.card} onPress={handlePress}>
      <Card.Cover source={{ uri: `${item.image}?${index}` }} />
      <Card.Title
      title={item.title}
      subtitle={
        item.description.length >43
          ? `${item.description.slice(0, 43)}... ver más`
          : item.description
      }
/>

    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
  },
});

export default CardFeatures;
