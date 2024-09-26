import React, { useEffect, useState } from 'react';
import { View, Image, Alert, Platform, ActivityIndicator,Linking, PermissionsAndroid, Modal, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Text } from 'react-native-paper';
import { updateClassCount,updateRequestCount } from '../utils/storageUtils'; 
import saveResultToStorage from '../utils/saveResultToStorage'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import apiClient from '../../api/apiClient';


interface Treatment {
  product: string;
  price: string;
  image_url: string;
  purchase_link: string;
}

interface Recommendations {
  treatment: Treatment[];
  description: string;
  common_hosts: string[];
  treatment_steps: string[];
  related_climatic_conditions: string[];
  precautions: string[];
  testimonials: { comment: string; user: string; rating: number }[];
  scientific_articles: { title: string; url: string }[];
  tutorial_videos: { title: string; url: string }[];
  general_tips:string
}

interface Typedata {
  recommendations: Recommendations;
  confidence: any;
  class: string;
}

const CalendarScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<Typedata | null>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [modelaVisibleProgres, setModelaVisibleProgres] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [isProcessing, setIsProcessing] = useState(false);

  console.log(modelaVisibleProgres)
  useEffect(() => {
    setModalVisible(true);
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Camera permission is required');
      return;
    }

    launchCamera(
      { mediaType: 'photo', includeBase64: true },
      handleResponse
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      handleResponse
    );
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.error('Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri || null;
      setImageUri(imageUri);
      setModalVisible(false);
      if (imageUri) {
        uploadImage(imageUri);
      }
    }
  };

 
  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
  
    setIsProcessing(true);
    setModelaVisibleProgres(true);
    animateProgress();
  
    try {
      const response = await apiClient.post('/predict', formData); 
      const result = response; 
      setResult(result);
      saveResultToStorage(result);
      console.log(response)
  
      const className = result.class; 
      const classCount = await updateClassCount(className);
      console.log(`Class ${className} count:`, classCount);
  
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload the image');
    } finally {
      setModelaVisibleProgres(false);
      setIsProcessing(false);
      setProgress(new Animated.Value(0)); 
      setTimeout(() => setModelaVisibleProgres(false), 500); 
    }
  };
  

  const animateProgress = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      // Reset progress after animation completes
      setProgress(new Animated.Value(0));
    });
  };

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 90],
    outputRange: ['3%', '90%'],
  });

  return (
    <View style={{ flex: 1,backgroundColor:'#fff' ,justifyContent: 'center', alignItems: 'center' }}>
      {result && <Text variant='displaySmall'>Reporte de Análisis Predictivo </Text>}

      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
            {/* Progress Modal */}
     {modelaVisibleProgres &&(
      <>
       <Text style={styles.progressTitle}>Uploading Image...</Text>
       <View style={{justifyContent: 'center', alignItems: 'center',width:'60%', bottom: 100,}}>
       <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
       </View>
       <Text style={styles.progressText}>Processing...</Text>
      </>
     )}

{result && (
  <ScrollView style={styles.resultContainer}>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Class: {result?.class.replace(/_/g, ' ')}</Text>
      <Text style={styles.cardText}>Confidence: <Text style={styles.confidende}>{(result?.confidence * 100).toFixed(1)}%</Text></Text>
    </View>

    {/* Descripción */}
    {result.recommendations?.description && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.cardText}>{result.recommendations.description}</Text>
      </View>
    )}

    {/* Precautions */}
    {result.recommendations?.precautions && result.recommendations.precautions.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Precautions</Text>
        <Text style={styles.cardText}>{result.recommendations.precautions.join('\n')}</Text>
      </View>
    )}

    {/* General Tips */}
    {result.recommendations?.general_tips && result.recommendations.general_tips.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>General Tips</Text>
        <Text style={styles.cardText}>{result.recommendations.general_tips}</Text>
      </View>
    )}

    {/* Tratamientos solo si no es Healthy */}
    {result.class !== 'Healthy' && result.recommendations?.treatment && result.recommendations.treatment.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Treatment Steps</Text>
        <Text style={styles.cardText}>{result.recommendations?.treatment_steps?.join('\n')}</Text>
      </View>
    )}

    {/* Climas relacionados solo si no es Healthy */}
    {result.class !== 'Healthy' && result.recommendations?.related_climatic_conditions && result.recommendations.related_climatic_conditions.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Related Climatic Conditions</Text>
        <Text style={styles.cardText}>{result.recommendations?.related_climatic_conditions?.join(', ')}</Text>
      </View>
    )}

    {/* Testimonios solo si no es Healthy */}
    {result.class !== 'Healthy' && result.recommendations?.testimonials && result.recommendations.testimonials.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Testimonials</Text>
        {result.recommendations.testimonials.map((testimonial, index) => (
          <View key={index} style={styles.testimonialCard}>
            <Text style={styles.cardText}>"{testimonial?.comment}" - {testimonial?.user} (Rating: {testimonial?.rating})</Text>
          </View>
        ))}
      </View>
    )}

    {/* Artículos científicos solo si no es Healthy */}
    {result.class !== 'Healthy' && result.recommendations?.scientific_articles && result.recommendations.scientific_articles.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Scientific Articles</Text>
        {result.recommendations.scientific_articles.map((article, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(article?.url)}>
            <Text style={styles.linkText}>{article?.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

    {/* Videos tutoriales solo si no es Healthy */}
    {result.class !== 'Healthy' && result.recommendations?.tutorial_videos && result.recommendations.tutorial_videos.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tutorial Videos</Text>
        {result.recommendations.tutorial_videos.map((video, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(video?.url)}>
            <Text style={styles.linkText}>{video?.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </ScrollView>
)}  
    {/* Modal for image selection */}
      <Modal transparent={true} visible={modalVisible} animationType="slide" style={{backgroundColor:"transparent"}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Source</Text>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Icon name="camera-alt" size={23} color="#fff" />
              <Text style={styles.buttonText}> Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <Icon name="photo" size={23} color="#fff" />
              <Text style={styles.buttonText}> Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginTop: 5,
  },
  treatmentCard: {
    marginTop: 10,
  },
  treatmentImage: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
  },
  modalContent: {
    width: '80%',
    // backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#020302',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '55%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    bottom:10
  },
  progressContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    height:10
  },
  progressTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    width:18,
    backgroundColor: '#040504',
    borderRadius: 5,
    marginTop: 10,
    position: 'absolute',
    left: 0,
    padding:10
  },
  progressText: {
    marginTop: 5,
    fontSize: 16,
  },
  testimonialCard: {
    marginVertical: 5,
  },
  confidende:{
    fontWeight:'600',
    color:'#34A853'
  }
});

export default CalendarScreen;

