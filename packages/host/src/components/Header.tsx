import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar el texto del buscador

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Bucar servicios"
          onChangeText={setSearchQuery}
          value={searchQuery} // Vincular el valor con el estado
          style={styles.searchBar}
          // inputStyle={styles.input}
        />
        <View style={styles.circleIcon}>
        <FontAwesome name="account-outline" size={25} color="#fff" style={styles.userIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    // flex:1,
    backgroundColor: '#fff',
    marginBottom:18
  },
  container: {
    flexDirection: 'row', // Alinear la barra de búsqueda y el ícono en fila
    justifyContent: 'space-between', // Separar los componentes
    alignItems: 'center', // Alinear verticalmente
    paddingHorizontal: 16, // Espaciado lateral
    backgroundColor: '#fff',
    height: 110,
  },
  searchBar: {
     width:340,
    marginRight: 10, // Espacio entre la barra de búsqueda y el ícono
    backgroundColor: '#fff', // Fondo blanco para la barra de búsqueda
    borderRadius: 20, // Bordes redondeados para un aspecto moderno
  },
  userIcon: {
    padding: 8, // Espaciado alrededor del ícono
  },
  circleIcon:{
   backgroundColor:'#010302',
   height:40,
   width:40,
   borderRadius:20,
   justifyContent: 'center', // Alineación vertical del ícono
   alignItems: 'center', // Alineación horizontal del ícono
  }
});
