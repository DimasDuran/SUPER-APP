import React from 'react';
import { Avatar, Card, Button } from 'react-native-paper';

// Colores de Google
const googleColors: string[] = ['#A5D6A7', '#81C784', '#66BB6A', '#388E3C'];

let assignedColors: string[] = [];

const getUniqueGoogleColor = (index: number): string => {
  if (assignedColors.length === 0) {
    assignedColors = [...googleColors];
  }
  return assignedColors[index % assignedColors.length];
};

interface ScanItem {
  name: string;
  class: string;
  date: string;
}

interface RenderScanProps {
  item: ScanItem;
  index: number;
  onViewReport: (item: ScanItem) => void;
}

const RenderScaner: React.FC<RenderScanProps> = ({ item, index, onViewReport }) => {
  const uniqueColor = getUniqueGoogleColor(index);

  return (
    <Card mode="contained" style={{ backgroundColor: '#fff' }}>
      <Card.Title
        title={`Type of Pest • ${item.class}`}
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
          onPress={() => onViewReport(item)} // Pasar el item al padre para abrir el modal
        >
          View Report
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default RenderScaner;
