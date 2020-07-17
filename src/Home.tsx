import React from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';


interface coordinate{
    latitude: number;
    longitude: number;
}

interface placeDataObject{
    key: string;
    placeName: string;
    coordinate: coordinate;
}

interface locationData{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface State{
    placeDataArray: placeDataObject[];
    locationData: locationData;
    showList: boolean;
}

const defaultLocation = {
    latitude: 37.266162,
    longitude: 127.000055,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
}

class HomeScreen extends React.Component {
    constructor(props: object, nextProps: object){
        super(props);
        console.log("\nnextProps은 아래와 같다.")
        console.log(nextProps);
    }


    //console.log를 해보니 nextProps는 object 였고 prevStates는 interface에서 설정한 State.
    static getDerivedStateFromProps(nextProps: Object, prevState: State) {
        console.log("getDerivedStateFromProps 실행됨.");

        //첫 실행에서 undefined인 경우 이 함수 실행을 막는다.
        //또는 장소를 눌러 위치를 이동시킬 때, 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            console.log("처음 실행시 받는 정보는 undefined. 여기서 걸렀다.");

            return null;
        }
        if(!nextProps.route.params.canIAdd){
            console.log("장소 눌러 위치 이동시 state 변경되며, 이 때 state 변경 없어야 함.");
            console.log(nextProps);
            return null;
        }
        else{
            console.log("홈으로 받은 정보는 아래와 같다.")

            const newCoordinate:coordinate = {
                latitude: nextProps.route.params.latitude,
                longitude: nextProps.route.params.longitude,
            }
            const newPlaceData:placeDataObject = {
                key: nextProps.route.params.key,
                placeName: nextProps.route.params.placeName,
                coordinate: newCoordinate,
            }
            console.log(newPlaceData);
            
            //일회성 정보인 canIAdd는 이제 false로 바꾼다.
            nextProps.route.params.canIAdd=false;
            
            const newArray: placeDataObject[] = prevState.placeDataArray.concat(newPlaceData);
            return { placeDataArray: newArray }
        }
    }



    state:State = {
        
        placeDataArray:[
            //////////// TEST INFO FOR DEBUGGING ///////////
            // {
            //     key: '1',
            //     placeName: 'place1',
            //     coordinate: {
            //         latitude: 37.270162,
            //         longitude: 127.002055,
            //     }
                
            // },
            // {
            //     key: '2',
            //     placeName: 'place2',
            //     coordinate: {
            //         latitude: 37.262162,
            //         longitude: 127.001055,
            //     }
                
            // },
            // {
            //     key: '3',
            //     placeName: '수원역',
            //     coordinate: {
            //         latitude: 37.266162,
            //         longitude: 127.000055,
            //     }
            // }
        ],
        locationData:{
            latitude: 37.266162,
            longitude: 127.000055,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        },
        showList: false,
    }
    

    
    render() {

        //////////////////////////////////////////////////////////////////////
        // debugHandler should be removed!
        const debugHandler = () => {
            console.log("\n@@@@@ CHECK CURRENT STATE @@@@@");
            console.log(this.state);
            console.log("\n@@@@@ CHECK CURRENT STATE.placeDataArray @@@@@");
            console.log(this.state.placeDataArray);
        }
        // debugHandler should be removed!
        //////////////////////////////////////////////////////////////////////

        // 장소의 이름을 누르면 그 장소로 이동한다.
        // render()는 state가 변할 경우 다시 rendering하는 것을 이용.
        const placeNamePressHandler = (newlatitude: number, newlongitude: number) => {
            this.setState({ locationData: {
                latitude: newlatitude,
                longitude: newlongitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            } })
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

                <TouchableOpacity style={styles.openPlaceListButton} 
                    onPress={() => {this.state.showList = !this.state.showList; this.forceUpdate()}}
                    activeOpacity={1}
                >
                    <Text>열기</Text>
                </TouchableOpacity>

                <View style={this.state.showList ? styles.placeListContainer : styles.hideListContainer}>
                    <TouchableOpacity style={styles.closePlaceListButton} onPress={() => {this.state.showList = !this.state.showList; this.forceUpdate()}}>
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
                        <TouchableOpacity style={styles.placeList} onPress={() => 
                            placeNamePressHandler(item.coordinate.latitude, item.coordinate.longitude)}
                        >
                            <Text>{item.placeName}</Text>
                        </TouchableOpacity>
                        )} 
                    />
                </View>

                <TouchableOpacity style={styles.addPlaceButton_Home} onPress={() => {

                    // 기능개선 ///////////////////////////
                    // 현재 기능 : pressed 했을 때 this.state.locationData가 업데이트 됨.
                    // 사용자가 임의로 지도를 옮겼을 때 this.state.locationData가 업데이트 되면 좋겠음.

                    this.props.navigation.navigate('SelectPlaceScreen', 
                        { 
                            currentLatitude: this.state.locationData.latitude,
                            currentLongitude: this.state.locationData.longitude,
                            currentLatitudeDelta: this.state.locationData.longitudeDelta,
                            currentLongitudeDelta: this.state.locationData.latitudeDelta,
                        })
                }}
                >
                    <Text>장소 추가</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.debugButton2} onPress={debugHandler}>
                    <Text>debug</Text>
                </TouchableOpacity>

            </View>
        );
    }
  }

export default HomeScreen;