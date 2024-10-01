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
  isFavorite?: boolean;
  onShowInfo?: (miniapp: MiniApp) => void;
  onOpenApp: () => void;
}

const MiniAppItem: React.FC<MiniAppItemProps> = ({
  miniapp,
  isFavorite,
  onShowInfo,
  onOpenApp,
}) => {
  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        style={
          miniapp.disabled
            ? styles.appIconContainerBlocked
            : styles.appIconContainer
        }
        onPress={onOpenApp}
        disabled={miniapp.disabled}>
        <Icon name={miniapp.icon} size={30} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.appIconText}>{miniapp.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  appIconContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appIconContainerBlocked: {
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
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
});

export default MiniAppItem;
