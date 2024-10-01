import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarketplaceScreen from '../screens/NotificationScreen';
import NavBar from '../components/NavBar';

export type MarketplaceStackParamList = {
  Markeplace: undefined;
};

const Home = createNativeStackNavigator<MarketplaceStackParamList>();

const NotificationNativator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
      }}>
      <Home.Screen name="Markeplace" component={MarketplaceScreen} />
    </Home.Navigator>
  );
};

export default NotificationNativator;
