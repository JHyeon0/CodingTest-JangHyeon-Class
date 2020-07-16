import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';


//AddPlaceScreen 으로 navigate할 때 latitude, longtitude 정보 넘겨주어야 함.

let currentLatitude: number = 37.266162;
let currentLongtitude: number = 127.000055;
let regionInfo={
  latitude: currentLatitude,
  longitude: currentLongtitude,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
}

class HomeScreen extends Component{

    render(){
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle} region={regionInfo} >
                    <Marker draggable coordinate={regionInfo} />
                </MapView>        
                <TouchableOpacity style={styles.addPlaceButton_Home} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                    <Text>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addPlaceButton} onPress={() => this.props.navigation.navigate('AddPlaceScreen')}>
                    <Text>등록</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen;