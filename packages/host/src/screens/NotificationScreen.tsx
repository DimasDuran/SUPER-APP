import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, Button, Provider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';




const categories = ['Todos', 'Control', 'Monitoreo', 'Gestión'];

const NotificationScreen: React.FC = () => {


  

  
  return (
    <Provider>
      <View style={styles.container}>
      <Text>No hay notificaciones</Text>
      
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

export default NotificationScreen;
