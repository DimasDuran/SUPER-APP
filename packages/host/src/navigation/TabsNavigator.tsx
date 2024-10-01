import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import BlogNavigator from './BlogNavigator';
// import AccountNavigator from './AccountNavigator';
import NotificationNativator from './NotificationNativator';

export type TabsParamList = {
  HomeNav: undefined;
  BlogNav: undefined;
  AccountNav: undefined;
  NotificationNav: undefined;
};

const Tabs = createMaterialBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
    inactiveColor='#4a4e4d'
    activeColor='#0a0a0a'
    barStyle={{backgroundColor:'#fff'}}
    
    >
      <Tabs.Screen
        name="HomeNav"
        component={HomeNavigator}
        
         
        options={{
          title: '',
          tabBarIcon: 'home-outline',
        }}
      />
      <Tabs.Screen
        name="BlogNav"
        component={BlogNavigator}
        options={{
          title: 'Blogs',
          tabBarIcon: 'newspaper-variant-multiple',
        }}
      />
      <Tabs.Screen
        name="NotificationNav"
        component={NotificationNativator}
        options={{
          title: 'Notificaciones',
          tabBarIcon: 'bell-outline',
        }}
      />
     
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
