import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';


//AddPlaceScreen 으로 navigate할 때 latitude, longitude 정보 넘겨주어야 함.

const defaultRegion={
  latitude: 37.266162,
  longitude: 127.000055,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
}

const defaultCoordinate={
    latitude: 37.266162,
    longitude: 127.000055,
}

///////////////////////////
//처음위치 Home에서 받아와야 함.
///////////////////////////

interface coordinate{
    latitude: number;
    longitude: number;
}

interface region{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface State{
    coordinate: coordinate;
    region: region;
}

class HomeScreen extends Component{
    state: State = {
        coordinate: {
            latitude: 37.266162,
            longitude: 127.000055,
        },
        region: {
            latitude: 37.266162,
            longitude: 127.000055,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        }
    }

    static getDerivedStateFromProps(nextProps: Object, prevState: State) {
        console.log("Select Place에서 getDerivedStateFromProps 실행됨.");

        //첫 실행에서 undefined인 경우 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            console.log("undefined. 여기서 걸렀다.");
            return null;
        }
        else{
            const newCoordinate:coordinate = {
                latitude: nextProps.route.params.currentLatitude,
                longitude: nextProps.route.params.currentLongitude,
            }
            const newRegion:region = {
                latitude: nextProps.route.params.currentLatitude,
                longitude: nextProps.route.params.currentLongitude,
                latitudeDelta: nextProps.route.params.currentLatitudeDelta,
                longitudeDelta: nextProps.route.params.currentLongitudeDelta,
            }
            // console.log("Home에서 받아온 coordinate 값은 아래와 같다.")
            // console.log(newCoordinate);
            // console.log("Home에서 받아온 newRegion 값은 아래와 같다.")
            // console.log(newRegion);

            return { coordinate: newCoordinate, region: newRegion }
        }
    }


    render(){
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle} region={this.state.region} >
                    <Marker draggable coordinate={this.state.coordinate} 
                        onDragEnd={(e) => {
                            this.state.coordinate = e.nativeEvent.coordinate;
                            ////////////////////////////////////////////////////////////////////
                            // 왜 아래와 같이 했을 때는 state가 update되지 않는걸까?
                            // this.setState({coordinate: e.nativeEvent.coordinate}) 
                            ///////////////////////////////////////////////////////////////////
                            console.log(this.state.coordinate);
                        }} 
                    />
                </MapView>        
                <TouchableOpacity style={styles.addPlaceButton_Home} 
                    onPress={() => this.props.navigation.navigate('HomeScreen')}                   
                >
                    <Text>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addPlaceButton} onPress={() => {
                    this.props.navigation.navigate('AddPlaceScreen', {
                        latitudeInfo: this.state.coordinate.latitude,
                        longitudeInfo: this.state.coordinate.longitude,
                    })       
                }}
                >
                    <Text>등록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.debugButton2} onPress={() =>  console.log(this.state.coordinate)}>
                    <Text>debug2</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen;