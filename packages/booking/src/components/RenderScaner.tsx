// RenderScaner.tsx
import React from 'react';
import { Avatar, Card, Button } from 'react-native-paper';
import translateClassName from '../utils/traslateClass';

// Colores de Google
const googleColors: string[] = ['#A5D6A7', '#81C784', '#66BB6A', '#388E3C'];

let assignedColors: string[] = [];

const getUniqueGoogleColor = (index: number): string => {
  if (assignedColors.length === 0) {
    assignedColors = [...googleColors];
  }
  return assignedColors[index % assignedColors.length];
};

interface Recommendation {
  description: string;
  precautions: string[];
  testimonials: string[];
}

interface PredictionResult {
  imageUri: string;
  date: string;
  result: {
    class: string;
    confidence: number;
    recommendations: Recommendation;
  };
}

interface RenderScanProps {
  item: PredictionResult;
  index: number;
  onViewReport: (item: PredictionResult) => void;
}

// Componente RenderScaner para renderizar cada predicción
const RenderScaner: React.FC<RenderScanProps> = ({ item, index, onViewReport }) => {
  const uniqueColor = getUniqueGoogleColor(index);

  return (
    <Card mode="contained" style={{ backgroundColor: '#fff', marginBottom: 10 }}>
      <Card.Title
        title={`Tipo de Plaga • ${translateClassName(item.result.class)}`}
        subtitle={`${item.date}`}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="leaf"
            style={{ backgroundColor: uniqueColor }}
          />
        )}
      />
      <Card.Actions>
        <Button
          mode="contained"
          buttonColor={uniqueColor}
          onPress={() => onViewReport(item)} // Pasar el item al padre para abrir el reporte
        >
          Ver Reporte
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default RenderScaner;
