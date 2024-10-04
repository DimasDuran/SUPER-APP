import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import DetectNavigator from './DetectNavigator';
import AccountNavigator from './AccountNavigator';
import useCameraStore from '../hooks/CameraStore';

export type TabsParamList = {
  HomeNavigator: undefined;
  ScannerNavigator: undefined;
  AccountNavigator: undefined;
};

const Tabs = createMaterialBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {

  const { setCameraActive } = useCameraStore();

  return (
    <Tabs.Navigator
      barStyle={{
        backgroundColor: '#ffffff', 
        elevation: 0, 
        shadowOpacity: 0,
        shadowColor: 'transparent', 
      }}
      activeColor="#000" 
      inactiveColor="#4a4a4a" 
    >
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: 'home',
        }}
      />
      <Tabs.Screen
        name="ScannerNavigator"
        component={DetectNavigator}
        options={{
          title: 'Scanner',
          tabBarIcon: 'camera',
        }}
        listeners={{
          tabPress:() =>{
            setCameraActive(true)
          }
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: 'account',
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
