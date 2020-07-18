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
  SelectPlaceScreen: {
    currentLatitude: number;
    currentLongitude: number;
    currentLatitudeDelta: number;
    currentLongitudeDelta: number;
  };
  AddPlaceScreen: {
    latitudeInfo: number;
    longitudeInfo: number;
  }
};

const Stack = createStackNavigator<StackParamList>();



export default class App extends React.Component {
  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen" headerMode='none' >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SelectPlaceScreen" options={{animationEnabled: false}} component={SelectPlaceScreen} />
            <Stack.Screen name="AddPlaceScreen" component={AddPlaceScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}
