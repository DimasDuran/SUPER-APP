import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Text } from 'react-native-paper';
import usePredictionStorage from '../hooks/usePredictionStorage';

const { width: screenWidth } = Dimensions.get('window');

// Define the expected data structure for predictions
interface Recommendation {
  description: string;
  precautions: string[];
  testimonials: string[];
}

interface PredictionResult {
  imageUri: string;
  date: string; // Ensure you have a date property for the prediction
  result: {
    class: string;
    confidence: number;
    recommendations: Recommendation;
  };
}

// ClassData interface for chart data
interface ClassData {
  month: string; // Month name or number
  count: number; // Number of predictions
  color?: string;
}

const ChartComponent: React.FC = () => {
  // Use the custom hook to get the prediction data
  const { predictionData } = usePredictionStorage();

  // Aggregate predictions by month
  const predictionsByMonth: { [key: string]: number } = {};

  predictionData.forEach((prediction) => {
    const month = new Date(prediction.date).toLocaleString('default', { month: 'long' });
    predictionsByMonth[month] = (predictionsByMonth[month] || 0) + 1;
  });

  // Prepare data for the chart
  const classData: ClassData[] = Object.entries(predictionsByMonth).map(([month, count]) => ({
    month,
    count,
  }));

  const colors = ['#023a01', '#0a0a0a'];

  const formattedData = classData.map((item, index) => ({
    value: item.count,
    label: item.month,
    frontColor: colors[index % colors.length],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Número de predicciones por mes(Metrica)</Text>
      {formattedData.length > 0 ? (
        <BarChart
          data={formattedData}
          width={screenWidth - 40}
          height={300}
          barWidth={20}
          noOfSections={4}
          barBorderRadius={4}
          frontColor='#4CAF50'
          showValuesAsTopLabel
          topLabelTextStyle={{ color: '#595c5b', fontSize: 12, fontWeight: '800' }}
          spacing={40}
        />
      ) : (
        <Text>No data available</Text>
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
});

export default ChartComponent;
