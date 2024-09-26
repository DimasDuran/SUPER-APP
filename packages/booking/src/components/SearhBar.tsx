import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface Props {
  Indice: string;
  setSearchQuery: (query: string) => void;
}

const SearhBarComponent: React.FC<Props> = ({ Indice, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={Indice}
    />
  );
};

export default SearhBarComponent;
