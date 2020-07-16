import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class DetailsScreen extends React.Component {
    render() {
        const data:string = "this is data";
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('HomeScreen', {data})}
                />
            </View>
        );
    }
  }

  export default DetailsScreen;