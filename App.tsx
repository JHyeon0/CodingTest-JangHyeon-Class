import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home';
import AddPlaceScreen from './src/AddPlace'
import { StackParamList } from './src/StackParamList';

interface RoutesProps {}

const Stack = createStackNavigator<StackParamList>();



export default class App extends React.Component<RoutesProps> {
  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{header:()=>null, headerTitle: '추가'}} />
            <Stack.Screen name="AddPlaceScreen" component={AddPlaceScreen} options={{headerTitle: '추가'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}
