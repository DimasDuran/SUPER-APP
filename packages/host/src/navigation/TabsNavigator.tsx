import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import AccountNavigator from './AccountNavigator';
import MarketplaceNativator from './MarketplaceNativator';

export type TabsParamList = {
  HomeNavigator: undefined;
  ServicesNavigator: undefined;
  AccountNavigator: undefined;
  MarketplaceNativator: undefined;
};

const Tabs = createMaterialBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: 'home-outline',
        }}
      />
      <Tabs.Screen
        name="ServicesNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Mis apps',
          tabBarIcon: 'heart-outline',
        }}
      />
      <Tabs.Screen
        name="MarketplaceNativator"
        component={MarketplaceNativator}
        options={{
          title: 'Marketplace',
          tabBarIcon: 'store-outline',
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: 'account-outline',
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
