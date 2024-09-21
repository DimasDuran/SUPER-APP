import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Text, Modal, Portal, Button, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import miniapps from '../data/minisapps.json'; 

type MiniApp = {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  disabled: boolean;
};

// Categorías de miniapps agrícolas
const categories = ['Todos', 'Control', 'Monitoreo', 'Gestión'];

const MarketplaceScreeen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedMiniapp, setSelectedMiniapp] = useState<MiniApp | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filtrar miniapps según la categoría seleccionada
  const filteredMiniapps = selectedCategory === 'Todos'
    ? miniapps
    : miniapps.filter(miniapp => miniapp.category === selectedCategory);

  const showInfo = (miniapp: React.SetStateAction<MiniApp | null>) => {
    setSelectedMiniapp(miniapp);
    setModalVisible(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title} variant='displayLarge'>High-Performance Agricultural Miniapps</Text>

        {/* Botones de categorías */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de miniapps filtradas */}
        <FlatList
          data={filteredMiniapps}
          keyExtractor={(item) => item.id}
          numColumns={3}  // Mostrar en una cuadrícula de 3 columnas
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity style={item.disabled ? styles.appIconContainerBlocked : styles.appIconContainer} disabled={item.disabled}>
                <Icon name={item.icon} size={50} color={item.color} />
                <Text style={styles.appIconText}>{item.name}</Text>
              </TouchableOpacity>

              {/* Icono de información */}
              <TouchableOpacity style={{ position: 'absolute', top: 10, left: 84 }} onPress={() => showInfo(item)}>
                <Icon name="information-circle-outline" size={24} color={item.color} />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Modal para mostrar la información */}
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
            {selectedMiniapp && (
              <>
                <Text style={styles.modalTitle}>{selectedMiniapp.name}</Text>
                <Text style={styles.modalDescription}>{selectedMiniapp.description}</Text>
                <Button 
                  mode="text" 
                  style={{ width: '40%', backgroundColor: selectedMiniapp.color }} 
                  onPress={() => setModalVisible(false)}
                >
                <Text style={{color:'#fff'}}> Close</Text>
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
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '30%',
  },
  appIconContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appIconContainerBlocked: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appIconText: {
    fontSize: 12,
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
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

export default MarketplaceScreeen;
