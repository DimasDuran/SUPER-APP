import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Text } from 'react-native-paper';
import usePredictionStorage from '../hooks/usePredictionStorage';
import translateClassName from '../utils/traslateClass';

const { width: screenWidth } = Dimensions.get('window');


interface PieChartData {
  value: number;
  label: string;
  color: string;
}

const PlagueCountPieChartComponent: React.FC = () => {
  // Use the custom hook to get the prediction data
  const { predictionData } = usePredictionStorage();

  // Filtrar las clases saludables (no queremos incluirlas en el gráfico)
  const healthyClasses = ['Pepper__bell___healthy', 'Potato___healthy', 'Tomato_healthy'];

  // Aggregate predictions by plague type (class)
  const plagueCounts: { [key: string]: number } = {};

  predictionData.forEach((prediction) => {
    const plagueType = translateClassName(prediction.result.class);
    // Solo contar las plagas, no las clases saludables
    if (!healthyClasses.includes(plagueType)) {
      plagueCounts[plagueType] = (plagueCounts[plagueType] || 0) + 1;
    }
  });

  // Prepare data for the PieChart
  const colors = ['#f54242', '#f5a642', '#f5e642', '#42f551', '#4287f5', '#a142f5', '#f5428f'];

  const pieChartData: PieChartData[] = Object.entries(plagueCounts).map(([plagueType, count], index) => ({
    value: count, // Mostrar el número de detecciones por tipo de plaga
    label: plagueType,
    color: colors[index % colors.length],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Número de plagas detectadas</Text>
      {pieChartData.length > 0 ? (
        <>
          <PieChart
            data={pieChartData}
            donut
            showText
            textColor="black"
            radius={130}
            innerRadius={70}
            textSize={14}
            showValuesAsLabels
            showTextBackground
            textBackgroundRadius={22}
            textBackgroundColor="rgba(0,0,0,0.1)"
            labelsPosition="outward"
            centerLabelComponent={() => (
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total</Text>
            )}
          />
          
          {/* Legend section */}
          <View style={styles.legendContainer}>
            {pieChartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
    </View>
  );
};

// Styles
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
  legendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 14,
  },
});

export default PlagueCountPieChartComponent;
