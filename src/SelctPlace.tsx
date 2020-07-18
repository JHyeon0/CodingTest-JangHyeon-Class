import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';


interface Coordinate{
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
    coordinate: Coordinate;
    region: region;
}
interface Object{
    route: Object;
    params: Object;
    currentLatitude: number;
    currentLongitude: number;
    currentLatitudeDelta: number;
    currentLongitudeDelta: number;
}
interface Props {
    navigation: any;
}
class HomeScreen extends Component<Props>{

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

    // HomeScreen에서 받아온 정보로 지도의 시작 위치를 정한다.
    static getDerivedStateFromProps(nextProps: Object, prevState: State) {
        //첫 실행에서 undefined인 경우 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            console.log("undefined. 여기서 걸렀다.");
            return null;
        }
        else{
            const newCoordinate:Coordinate = {
                latitude: nextProps.route.params.currentLatitude,
                longitude: nextProps.route.params.currentLongitude,
            }
            const newRegion:region = {
                latitude: nextProps.route.params.currentLatitude,
                longitude: nextProps.route.params.currentLongitude,
                latitudeDelta: nextProps.route.params.currentLatitudeDelta,
                longitudeDelta: nextProps.route.params.currentLongitudeDelta,
            }
            return { coordinate: newCoordinate, region: newRegion }
        }
    }


    render(){

        const AddPressHandler = () =>{
            this.props.navigation.navigate('AddPlaceScreen', {
                latitudeInfo: this.state.coordinate.latitude,
                longitudeInfo: this.state.coordinate.longitude,
                })
        }
        
        return(
            <View>
                <MapView 
                    style={styles.mapStyle} 
                    initialRegion={this.state.region} 
                    region={this.state.region} 
                >
                    <Marker 
                        draggable 
                        coordinate={this.state.coordinate} 
                        onDragEnd={(e) => this.state.coordinate = e.nativeEvent.coordinate} 
                    />
                </MapView>        
                <TouchableOpacity 
                    style={styles.cancelAddButton} 
                    onPress={() => this.props.navigation.navigate('HomeScreen')}                   
                >
                    <Text>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.addPlaceButton} 
                    onPress={AddPressHandler}
                >
                    <Text>추가</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen;