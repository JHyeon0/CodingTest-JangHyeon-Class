import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home';
import SelectPlaceScreen from './src/SelctPlace'
import AddPlaceScreen from './src/AddPlace'

type StackParamList = {
  HomeScreen: {
    key: string;
    placeName: string;
    latitude: number;
    longitude: number;
    canIAdd: boolean;
  };
  AddPlaceScreen: undefined;
  SelectPlaceScreen: undefined;
  ListPlaceScreen: undefined;
};
const Stack = createStackNavigator<StackParamList>();

//const Stack = createStackNavigator();



export default class App extends React.Component {
  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SelectPlaceScreen" component={SelectPlaceScreen} />
            <Stack.Screen name="AddPlaceScreen" component={AddPlaceScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}
