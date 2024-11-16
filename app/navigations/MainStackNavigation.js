import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATOR, SCREEN} from './RoutesName';
import SplashScreen from '../screens/splashScreens/SplashScreen';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  const CustomSlideInterpolator = ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    };
  };
  return (
    <Stack.Navigator
      initialRouteName={SCREEN.SPLASH_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN.SPLASH_SCREEN}
        component={SplashScreen}
        options={{
          cardStyleInterpolator: CustomSlideInterpolator,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name={NAVIGATOR.DRAWER_NAVIGATOR}
        component={DrawerNavigation}
        options={{
          cardStyleInterpolator: CustomSlideInterpolator,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;

const styles = StyleSheet.create({});
