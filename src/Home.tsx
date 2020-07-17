import React from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';


interface Coordinate{
    latitude: number;
    longitude: number;
}
interface placeData{
    key: string;
    placeName: string;
    coordinate: Coordinate;
}
interface locationData{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}
interface State{
    placeDataArray: placeData[];
    locationData: locationData;
    showList: boolean;
}


class HomeScreen extends React.Component {
    
    // state 
    state:State = {        
        placeDataArray:[],
        locationData:{
            latitude: 37.266162,
            longitude: 127.000055,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        },
        showList: false,
    }

    // props를 전달받거나, state가 변할 경우 이 함수를 실행한다.
    // AddPlaceScreen에서 받아온 placeData를 state에 업데이트 시킨다.
    static getDerivedStateFromProps(nextProps: Object, prevState: State) {
        //첫 실행에서 route.params가 undefined인 경우 이 함수 실행을 막는다.
        //또는 장소 이름을 누르고 state.locationData 변할 때 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined || !nextProps.route.params.canIAdd){
            return null;
        }
        else{
            nextProps.route.params.canIAdd=false;

            const newCoordinate:Coordinate = {
                latitude: nextProps.route.params.latitude,
                longitude: nextProps.route.params.longitude,
            }
            const newPlaceData:placeData = {
                key: nextProps.route.params.key,
                placeName: nextProps.route.params.placeName,
                coordinate: newCoordinate,
            }
            const newPlaceDataArray: placeData[] = prevState.placeDataArray.concat(newPlaceData);
            
            return { placeDataArray: newPlaceDataArray }
        }
    }
    
    render() {

        // 장소의 이름을 누르면 그 장소로 이동한다.
        const PlaceNamePressHandler = (newlatitude: number, newlongitude: number) => {
            this.setState({ locationData: {
                latitude: newlatitude,
                longitude: newlongitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            } })
        }

        // 장소 추가 버튼을 누르면 화면 전환. 현재 위치에 대한 정보 전달.
        const AddPlacePressHandler = () => {
            this.props.navigation.navigate('SelectPlaceScreen', { 
                currentLatitude: this.state.locationData.latitude,
                currentLongitude: this.state.locationData.longitude,
                currentLatitudeDelta: this.state.locationData.longitudeDelta,
                currentLongitudeDelta: this.state.locationData.latitudeDelta,
                })
        }

        // 장소 리스트 화면 on/off 토글러.
        const listViewToggler = () => {
            this.state.showList = !this.state.showList; 
            this.forceUpdate();
        }
        
        return (
            <View>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={this.state.locationData}
                    region={this.state.locationData} 
                >
                    {this.state.placeDataArray.map(marker => (
                        <Marker coordinate={marker.coordinate}/>
                    ))}
                </MapView>

                <TouchableOpacity 
                    style={styles.openListButton} 
                    onPress={listViewToggler}
                    activeOpacity={1} 
                >
                    <Text>열기</Text>
                </TouchableOpacity>

                <View style={this.state.showList ? styles.showListContainer : styles.hideListContainer} >
                    <TouchableOpacity style={styles.closeListButton} onPress={listViewToggler} >
                        <Text>닫기</Text>
                    </TouchableOpacity>
                    <FlatList 
                        ListEmptyComponent={
                            <View style={styles.emptyList}>
                                <Text>장소가 없습니다.</Text>
                            </View>
                            }
                        data={this.state.placeDataArray}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.placeList} 
                                onPress={() => 
                                    PlaceNamePressHandler(item.coordinate.latitude, item.coordinate.longitude)} >
                                <Text>{item.placeName}</Text>
                            </TouchableOpacity>
                            )} 
                    />
                </View>

                <TouchableOpacity style={styles.addPlaceButton_Home} onPress={AddPlacePressHandler} >
                    <Text>장소 추가</Text>
                </TouchableOpacity>

            </View>
        );
    }
  }

export default HomeScreen;