import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home';
import DetailsScreen from './src/Details'
import SelectPlaceScreen from './src/SelctPlace'
import AddPlaceScreen from './src/AddPlace'

type StackParamList = {
  HomeScreen: undefined;
  AddPlaceScreen: undefined;
  SelectPlaceScreen: undefined;
  ListPlaceScreen: undefined;
  DetailsScreen: undefined;
};


const Stack = createStackNavigator<StackParamList>();



export default class App extends React.Component {
  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SelectPlaceScreen" component={SelectPlaceScreen} />
            <Stack.Screen name="AddPlaceScreen" component={AddPlaceScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}
