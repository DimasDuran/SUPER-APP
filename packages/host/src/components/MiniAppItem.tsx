// MiniAppItem.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export type MiniApp = {
    id: string;
    name: string;
    category: string;
    icon: string;
    color: string;
    description: string;
    disabled: boolean;
  };

interface MiniAppItemProps {
  miniapp: MiniApp;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShowInfo: (miniapp: MiniApp) => void;
  onOpenApp: () => void;
}

const MiniAppItem: React.FC<MiniAppItemProps> = ({ miniapp, isFavorite, onToggleFavorite, onShowInfo, onOpenApp }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={
          miniapp.disabled
            ? styles.appIconContainerBlocked
            : styles.appIconContainer
        }
        onPress={onOpenApp}
        disabled={miniapp.disabled}>
        <Icon name={miniapp.icon} size={45} color={miniapp.color} />
        <Text style={styles.appIconText}>{miniapp.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: 'absolute', top: 10, left: 84 }}
        onPress={() => onShowInfo(miniapp)}>
        <Icon name="information-circle-outline" size={24} color={miniapp.color} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(miniapp.id)}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '30%',
  },
  appIconContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appIconContainerBlocked: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appIconText: {
    fontSize: 12,
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
});

export default MiniAppItem;
