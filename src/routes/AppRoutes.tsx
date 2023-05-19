import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon, useTheme } from 'native-base';

import FinishedTasks from 'atomic/templates/finishedTasks';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Tasks from 'atomic/templates/tasks';

type AppRoutes = {
  Tasks: undefined;
  FinishedTasks: undefined;
};

const Navigation: React.FC = () => {
  const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

  const { sizes, colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple[200],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.gray[800],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[6]
        }
      }}
    >
      <Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon as={MaterialIcons} size={'lg'} name="dehaze" color={color} />
          )
        }}
      />
      <Screen
        name="FinishedTasks"
        component={FinishedTasks}
        options={{
          tabBarLabel: 'Finished Tasks',
          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialIcons}
              size={'lg'}
              name="done-all"
              color={color}
            />
          )
        }}
      />
    </Navigator>
  );
};

export default Navigation;
