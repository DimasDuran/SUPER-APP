import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import DetectScreen from '../screens/DetectScreen';

export type CalendarStackParamList = {
  Detection: undefined;
};

const Calendar = createNativeStackNavigator<CalendarStackParamList>();

const DetectNavigator = () => {
  return (
    <Calendar.Navigator
      screenOptions={{
        header: NavBar,
      }}>
      <Calendar.Screen name="Detection" component={DetectScreen} />
    </Calendar.Navigator>
  );
};

export default DetectNavigator;
