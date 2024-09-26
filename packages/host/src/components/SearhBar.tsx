import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  Indice: string;
  setSearchQuery: (query: string) => void;
}

const SearhBarComponent: React.FC<Props> = ({ Indice, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={Indice}
        style={styles.searchbar}
        inputStyle={styles.input}
        iconColor="#4CAF50" // Color moderno para el icono de búsqueda
      />
    </View>
  );
};

export default SearhBarComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff', // Fondo sutil para modernizar el componente
    borderRadius: 10,
    marginBottom: 16,
  },
  searchbar: {
    borderRadius: 25,
    backgroundColor: '#fff', // Fondo blanco para mayor contraste
    elevation: 2, // Sombra para darle profundidad
  },
  input: {
    color: '#333', // Texto oscuro para buena legibilidad
    fontSize: 16, // Tamaño de texto más grande para una experiencia moderna
  },
});
