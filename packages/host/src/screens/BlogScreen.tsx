import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';


const BlogScreen = () => {



  return (
    <View style={styles.container}>
    <Text>Hola</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 8,
  },
  serviceItem: {
    flex: 1,
    padding: 8,
    maxWidth: '100%',
  },
  lastServiceItem: {
    maxWidth: '50%',
  },
});

export default BlogScreen;
