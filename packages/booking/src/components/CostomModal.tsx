import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  className: string;
  date: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, className, date }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose} // Cierra el modal al presionar el botón de atrás
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Scan Details</Text>
          <Text style={styles.modalText}>Class: {className}</Text>
          <Text style={styles.modalText}>Date: {date}</Text>
          <Button mode="contained" onPress={onClose}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CustomModal;
