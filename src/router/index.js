import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ContactDetail, ContactList, Splash } from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
