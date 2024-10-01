import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Modal, Portal, Provider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Bannner from '../components/Banner';
import MiniAppItem from '../components/MiniAppItem';
import CardPromo from '../components/CardPromo';
import useAppStore from '../hooks/useRecentAppsStore';
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

type RootStackParamList = {
  Marketplace: undefined;
  PlagaGuard: undefined;
};

type MarketplaceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Marketplace'
>;

const HomeScreen = () => {
  const { recentApps, addRecentApp, loadRecentApps } = useAppStore();
  const navigation = useNavigation<MarketplaceScreenNavigationProp>();
  const [selectedMiniapp, setSelectedMiniapp] = useState<MiniApp | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadRecentApps();
  }, [loadRecentApps]);

  const showInfo = (miniapp: MiniApp) => {
    setSelectedMiniapp(miniapp);
    setModalVisible(true);
  };

  const handleOpenApp = async (miniapp: any) => {
    addRecentApp(miniapp.id);
    try {
      switch (miniapp?.id) {
        case '1':
          navigation.navigate('PlagaGuard');
          break;
        case '2':
        case '3':
          navigation.navigate('Marketplace');
          break;
        default:
          console.warn('No navigation case for this mini app');
      }
    } catch (error) {
      console.error('Error navigating to app:', error);
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <Bannner />
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Apps Agrícolas
          </Text>
          <Button mode="contained-tonal" style={styles.btnall} onPress={() => {}}>
           <Text style={styles.btnalltext}> Ver Todas</Text>
          </Button>
        </View>

        <FlatList
          data={miniapps}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <MiniAppItem
              miniapp={item}
              onShowInfo={showInfo}
              onOpenApp={() => handleOpenApp(item)}
            />
          )}
          style={styles.flatList}
        />

        <View style={styles.promoContainer}>
          <CardPromo />
        </View>

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
                  <Text style={{ color: '#fff' }}>Cerrar</Text>
                </Button>
              </>
            )}
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  flatList: {
    flexGrow: 0,
  },
  flatListContent: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  promoContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
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
  btnall: {
    backgroundColor: '#000',
  },
  btnalltext: {
    color: '#fff',
  },
});

export default HomeScreen;
