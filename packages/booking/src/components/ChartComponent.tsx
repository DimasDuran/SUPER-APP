import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener el ancho de la pantalla
const { width: screenWidth } = Dimensions.get('window');

// Definir el tipo de datos para cada clase
interface ClassData {
  population: number;
  name: string;
  color?: string;
}

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('classCounts');
        const classCounts: ClassData[] = storedData ? JSON.parse(storedData) : [];

        if (classCounts.length > 0) {
          setData(classCounts);
        } else {
          Alert.alert('No data', 'No class data found.');
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        Alert.alert('Error', 'Failed to load chart data');
      }
    };

    fetchData();
  }, []);

  const colors = ['#A8D5BA', '#6FBF8C', '#4B8B3B', '#2A5D29', '#1D4D24'];

  const formattedData = data.map((item, index) => ({
    value: item.population,
    label: item.name,
    frontColor: colors[index % colors.length],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Class Distribution (Bar Chart)</Text>
      {data.length > 0 ? (
        <BarChart
          data={formattedData}
          width={screenWidth - 40}
          height={300}
          barWidth={20} // Reducir el ancho de las barras
          noOfSections={4}
          barBorderRadius={4}
          frontColor='#4CAF50'
          showValuesAsTopLabel // Mostrar los valores encima de las barras
          topLabelTextStyle	={{ color: '#595c5b', fontSize: 12,fontWeight:'800'
          }}
          spacing={40} // Aumentar el espaciado entre las barras
        />
      ) : (
        <Text>No data available</Text>
      )}

      {selectedClass && (
        <Text style={styles.selectedText}>
          Selected Class: {selectedClass}
        </Text>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#326022',
    marginBottom: 16,
    textAlign: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  
  },
});

export default ChartComponent;
