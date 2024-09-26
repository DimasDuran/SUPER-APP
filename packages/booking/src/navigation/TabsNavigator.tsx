import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import CalendarNavigator from './CalendarNavigator';
import AccountNavigator from './AccountNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  CalendarNavigator: undefined;
  AccountNavigator: undefined;
};

const Tabs = createMaterialBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      barStyle={{
        backgroundColor: '#ffffff', // Fondo blanco
        elevation: 0, // Eliminar sombra en Android
        shadowOpacity: 0, // Eliminar sombra en iOS
        shadowColor: 'transparent', // Eliminar cualquier sombra residual
      }}
      activeColor="#388E3C" // Verde para iconos activos
      inactiveColor="#A5D6A7" // Verde suave para iconos inactivos
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
        name="CalendarNavigator"
        component={CalendarNavigator}
        options={{
          title: 'Scanner',
          tabBarIcon: 'barcode-scan',
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
