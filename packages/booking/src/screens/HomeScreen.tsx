import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, View, FlatList, Text } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import featuredServices from '../data/featuredServices.json';
import ChartComponent from '../components/ChartComponent';
import renderScaner from '../components/RenderScaner';
import useStore from '../hooks/useStoredDta';

interface ModalData {
  name: string;
  date: string;
  class: string;
}

const HomeScreen = () => {
  const { imageResults, loadResults } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  // Cargar los resultados iniciales y escuchar cambios
  useEffect(() => {
    const interval = setInterval(() => {
      loadResults(); // Llamar a la función para cargar los datos en intervalos
    }, 3000); // Ajusta el intervalo a lo que necesites (en milisegundos)

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [loadResults]);

  const handleViewReport = (item: ModalData) => {
    setModalData(item); // Establece los datos para el modal
    setModalVisible(true); // Muestra el modal
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sección de Funcionalidades Clave */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Key Features</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={featuredServices.data}
        renderItem={({ item, index }) => (
          <Card mode="contained" style={{ backgroundColor: '#fff' }}>
            <Card.Cover source={{ uri: `${item.image}?${index}` }} />
            <Card.Title title={`${item.title}`} subtitle={item.description} />
          </Card>
        )}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Gráfica */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Number of analytical shots during periods</Text>
      </View>
      <ChartComponent />

      {/* Sección de Reportes Recientes */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Scans</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={imageResults.slice(-3)}
        renderItem={({ item, index }) =>
          renderScaner({ item, index, onViewReport: handleViewReport })
        }
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Modal para mostrar detalles */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {modalData && (
              <>
                <Text style={styles.modalTitle}>Scan Details</Text>
                <Text style={styles.modalText}>Name: {modalData.class}</Text>
                <Text style={styles.modalText}>Date: {modalData.date}</Text>
              </>
            )}
            <Button mode="contained" onPress={closeModal} buttonColor="#388E3C" style={styles.ntnclose}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: 'transparent',
    width: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  ntnclose: {
    width: '30%',
  },
});

export default HomeScreen;
