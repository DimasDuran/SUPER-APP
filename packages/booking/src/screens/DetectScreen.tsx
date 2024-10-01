import React, { useEffect, useState,useRef,useMemo } from 'react';
import { View, Image, Alert,Button ,Platform, ActivityIndicator,Linking, PermissionsAndroid, Modal, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import saveResultToStorage from '../utils/saveResultToStorage'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import apiClient from '../../api/apiClient';
import useCameraStore from '../hooks/CameraStore';
import useLastDetection from '../hooks/useStoredDta';


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

export type Nav = {
  HomeNavigator:undefined
}

const DetectScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<Typedata | null>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [modelaVisibleProgres, setModelaVisibleProgres] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [isProcessing, setIsProcessing] = useState(false);
  const { isCameraActive,setCameraActive} = useCameraStore()
  const navigate = useNavigation()


  // const {addResult } = saveResultToStorage()
  const { addResult} = useLastDetection()

  useEffect(() => {
    setCameraActive(true);
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Camera permission is required to take pictures.');
        }
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error', err);
        Alert.alert('Error', 'Failed to request camera permission.');
        return false;
      }
    } else {
      return true; // iOS has automatic permission handling
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
      Alert.alert('Error', 'There was an issue accessing the image picker.');
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri || null;
      if (imageUri) {
        setImageUri(imageUri);
        setCameraActive(false);
        uploadImage(imageUri);
      } else {
        Alert.alert('Error', 'Invalid image data.');
      }
    } else {
      Alert.alert('Error', 'No image selected.');
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
      if (response.data && response.data.class) {
        const result = response.data;
        setResult(result);
        const detection = { imageUri: uri, result: result };
        addResult(result)
        //No esta gurdando bien los datos
        // [21:44:24.546Z][Console] Mi actividad ====> {"modalData": {"class": undefined, "date": "2024-09-28-15:43", "imagenUri": undefined, "name": undefined}} 

      
         
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload the image or process the response.');
    } finally {
      setModelaVisibleProgres(false);
      setIsProcessing(false);
      setProgress(new Animated.Value(0));
    }
  };
  


  const animateProgress = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false, // Cambia a true si no necesitas que afecte el layout
    }).start(() => {
      setProgress(new Animated.Value(0)); // Reset progress after completion
    });
  };

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 90],
    outputRange: ['3%', '90%'],
  });

  const gotTohome = () =>{
    // navigate.navigate("")
    setCameraActive(false)
  }

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
      <Text style={styles.cardText}>
     Confidence: <Text style={styles.confidende}>{(result?.confidence * 100).toFixed(2)}%</Text>
</Text>
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
      <Modal transparent={true} visible={isCameraActive} animationType="slide" style={{backgroundColor:"transparent"}}>
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
            <TouchableOpacity style={styles.button} onPress={gotTohome}>
              <Icon name="photo" size={23} color="#fff" />
              <Text style={styles.buttonText}>Close</Text>
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
    backgroundColor: '#fff',
  
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
    backgroundColor: '#34A853',
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
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DetectScreen;


