import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Splash } from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
