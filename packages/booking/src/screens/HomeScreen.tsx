import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, View, FlatList, Image } from 'react-native';
import { Card, Button, Divider,Text } from 'react-native-paper';
import featuredServices from "../data/featuredServices.json";
import ChartComponent from '../components/ChartComponent';
import PlaguePercentageChartComponent from '../components/ChartComponentPest';
import CardFeatures from '../components/CardFeatures';
import usePredictionStorage from '../hooks/usePredictionStorage';
import { PredictionResult } from '../hooks/storagePrediction';
import RenderScaner from '../components/RenderScaner';
import translateClassName from '../utils/traslateClass';
import formatPrediction from '../utils/formatpredict';

interface ModalData {
  class: string;
  date: string;
  imageUri: any;
  confidence:number
}

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const { predictionData } = usePredictionStorage();

  const handleViewReport = (item: PredictionResult) => {
    setModalData({ class: item.result.class, date: item.date, imageUri: item.imageUri, confidence: item.result.confidence });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  console.log('Datos almacenados desde el store');
  console.log("====================================", { predictionData });

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
          <CardFeatures item={item} index={index} />
        )}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Gráfica */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Number of analytical shots during periods</Text>
      </View>
      <ChartComponent />
      <PlaguePercentageChartComponent />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Últimos Reportes</Text>
      </View>
      <FlatList
        data={predictionData}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <RenderScaner item={item} index={index} onViewReport={handleViewReport} />
        )}
      />

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
              <Text variant='titleLarge'>Detalle del reporte.</Text>
              <View style={styles.conatinerImage}>
              <Image 
                  source={{ uri: modalData.imageUri }} 
                  style={styles.image} 
                  resizeMode="contain" // Ajusta cómo se muestra la imagen
                />
              </View>
                <Text style={styles.modalTitle}>Datos del Análisis:</Text>
                <Text style={styles.modalText}>Tipo de plaga: {translateClassName(modalData.class)}</Text>
                <Text style={styles.modalText}>Porcentaje de Confianza:<Text style={styles.modalTextPrediction}> {formatPrediction(modalData.confidence)}</Text></Text> 
                <Text style={styles.modalText}>Fecha del Reporte: {modalData.date}</Text>
              </>
            )}
            <Button mode="contained" onPress={closeModal} buttonColor="#040604" style={styles.ntnclose}>
              Cerrar
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
  modalTextPrediction:{
     fontSize:16,
     marginBottom:10,
     color:'#00e532',
     fontWeight:'600'
  },
  ntnclose: {
    width: '30%',
    marginTop:12
  },
  image: {
    height: 150, 
    width: 160, 
    marginBottom: 10, 
    borderRadius:10,

  },
  conatinerImage:{
    alignItems:'center',
    alignContent:'center',
    margin:12
  }

});

export default HomeScreen;
