import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AppsSeccionsProps {
  icono: string; // Prop para recibir el nombre del ícono
  label: string; // Prop para recibir el texto de la sección
}

const AppsSeccions: React.FC<AppsSeccionsProps> = ({ icono, label }) => {
  
  // Función que devuelve un ícono según el nombre
  const IconosApp = (icono: string) => {
    switch (icono) {
      case 'home':
        return <MaterialCommunityIcons name="home" size={24} color="#000" />;
      case 'settings':
        return <MaterialCommunityIcons name="cog" size={24} color="#000" />;
      case 'information':
        return <MaterialCommunityIcons name="information" size={24} color="#000" />;
      // Agrega más casos según sea necesario
      default:
        return <MaterialCommunityIcons name="alert" size={24} color="#000" />; // Ícono por defecto
    }
  };

  return (
    <View style={styles.containerApp}>
      {IconosApp(icono)} {/* Renderiza el ícono */}
      <Text>{label}</Text> {/* Muestra el texto de la sección */}
    </View>
  );
};

export default AppsSeccions;

const styles = StyleSheet.create({
  containerApp: {
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
});
