import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NavBar from '../components/NavBar';
import KeysFeaturesScreen from '../screens/KeysFeaturesScreen';

export type HomeStackParamList = {
  Home: undefined;
  KessFeatures: undefined;
};

const Home = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
        title: 'PlagaDetect',
      }}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="KessFeatures" component={KeysFeaturesScreen} />
    </Home.Navigator>
  );
};

export default HomeNavigator;
