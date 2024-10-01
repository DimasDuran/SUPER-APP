import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlagaGuradScreen from '../screens/PlagaGuradScreen';
import TabsNavigator from './TabsNavigator';
import DashboardScreen from '../screens/DashboardScreen';

export type MainStackParamList = {
  Tabs: undefined;
  PlagaGuard: undefined;
  Shopping: undefined;
  News: undefined;
  Dashboard: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
      <Main.Screen name="PlagaGuard" component={PlagaGuradScreen} />
      <Main.Screen name="Dashboard" component={DashboardScreen} />
    </Main.Navigator>
  );
};

export default MainNavigator;
