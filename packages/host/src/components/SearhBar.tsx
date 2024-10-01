import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  Indice: string;
  setSearchQuery: (query: string) => void;
}

const SearhBarComponent: React.FC<Props> = ({ Indice, setSearchQuery }) => {
  return (
      <Searchbar
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={Indice}
        style={styles.searchbar}
        inputStyle={styles.input}
        iconColor="#4CAF50" 
      />
  );
};

export default SearhBarComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    marginBottom: 16,
  },
  searchbar: {
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  input: {
    color: '#333', 
    fontSize: 16, // Tamaño de texto más grande para una experiencia moderna
  },
});
