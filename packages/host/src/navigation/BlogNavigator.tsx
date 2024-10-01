import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlogScreen from '../screens/BlogScreen';
import NavBar from '../components/NavBar';

export type ServicesStackParamList = {
  Blog: undefined;
};

const Home = createNativeStackNavigator<ServicesStackParamList>();

const ServicesNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
      }}>
      <Home.Screen name="Blog" component={BlogScreen} />
    </Home.Navigator>
  );
};

export default ServicesNavigator;
