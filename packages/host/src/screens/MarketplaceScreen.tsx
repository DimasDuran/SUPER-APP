import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, Button, Provider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SearchBarComponent from '../components/SearhBar';
import useStore from '../hooks/usefavorites';
import miniapps from '../data/minisapps.json';
import MiniAppItem from '../components/MiniAppItem';

type MiniApp = {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  disabled: boolean;
};

type RootStackParamList = {
  Marketplace: undefined;
  Booking: undefined;
  // Agrega otras pantallas aquí según sea necesario
};

type MarketplaceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Marketplace'
>;

const categories = ['Todos', 'Control', 'Monitoreo', 'Gestión'];

const MarketplaceScreen: React.FC = () => {
  const { favorites, initializeFavorites, toggleFavorite, addRecentAccessed } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedMiniapp, setSelectedMiniapp] = useState<MiniApp | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  const navigation = useNavigation<MarketplaceScreenNavigationProp>();

  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);

  const filteredMiniapps =
    selectedCategory === 'Todos'
      ? miniapps.filter((miniapp) =>
          miniapp.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : miniapps.filter(
          (miniapp) =>
            miniapp.category === selectedCategory &&
            miniapp.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const showInfo = (miniapp: MiniApp) => {
    setSelectedMiniapp(miniapp);
    setModalVisible(true);
  };

  const handleOpenApp = async (miniapp: MiniApp) => {
    try {

      switch (miniapp?.id) {
        case "1":
          navigation.navigate("Booking");
          break;
        case "2":
        case "3":
          navigation.navigate("Marketplace");
          break;
        default:
          console.warn('No navigation case for this mini app');
      }
    } catch (error) {
      console.error('Error navigating to app:', error);
    }
  };

  const handleToggleFavorite = (miniappId: string) => {
    toggleFavorite(miniappId);
  };

  
  return (
    <Provider>
      <View style={styles.container}>
        <SearchBarComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredMiniapps}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <MiniAppItem
              miniapp={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={handleToggleFavorite}
              onShowInfo={showInfo}
              onOpenApp={() => handleOpenApp(item)} 
            />
          )}
        />

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContainer}>
            {selectedMiniapp && (
              <>
                <Text style={styles.modalTitle}>{selectedMiniapp.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedMiniapp.description}
                </Text>
                <Button
                  mode="text"
                  style={{ width: '40%', backgroundColor: selectedMiniapp.color }}
                  onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#fff' }}>Close</Text>
                </Button>
              </>
            )}
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  activeCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default MarketplaceScreen;
