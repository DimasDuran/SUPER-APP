import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import useStore from '../hooks/usefavorites';
import miniapps from '../data/minisapps.json';
import MiniAppItem from '../components/MiniAppItem';

const ServicesScreen = () => {
  // Obtener los favoritos desde la store
  const { favorites, initializeFavorites, toggleFavorite } = useStore();

  useEffect(() => {
    initializeFavorites(); // Cargar los favoritos al iniciar
  }, [initializeFavorites]);

  // Filtrar mini apps favoritas usando el arreglo de favoritos
  const favoriteMiniApps = miniapps.filter((miniapp) => favorites.includes(miniapp.id));

  // Renderizar cada mini app usando MiniAppItem
  const renderItem = ({ item }) => (
    <MiniAppItem
      miniapp={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
      onShowInfo={() => {}}
      onOpenApp={() => {}}
    />
  );

  return (
    <View style={styles.container}>
      {favoriteMiniApps.length > 0 ? (
        <FlatList
          numColumns={2} // Ajustar el número de columnas
          data={favoriteMiniApps} // Lista de mini apps favoritas
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <Text>No tienes mini apps favoritas aún.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 8,
  },
  serviceItem: {
    flex: 1,
    padding: 8,
    maxWidth: '100%',
  },
  lastServiceItem: {
    maxWidth: '50%',
  },
});

export default ServicesScreen;
