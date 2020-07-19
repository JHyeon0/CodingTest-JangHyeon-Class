import React, { MutableRefObject } from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import { StackParamList } from './StackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = 
    StackNavigationProp<StackParamList,'HomeScreen'>;

type HomeScreenRouteProp = 
    RouteProp<StackParamList, 'HomeScreen'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

interface Coordinate{
    latitude: number;
    longitude: number;
}
interface placeData{
    key: string;
    placeName: string;
    coordinate: Coordinate;
}
interface Region{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}
interface State{
    placeDataArray: placeData[];
    region: Region;
    showList: boolean;
    showListMarkers: boolean;
    coordinate: Coordinate;
}
interface HomeScreen{
    map: MapView | null;
    interval: number;
}



class HomeScreen extends React.Component<HomeProps> {

    // HomeScreen default state
    /*
        placeDataArray: 사용자가 저장한 장소 목록에 대한 정보
        locationData: 현재 사용자가 
        showList:
        showListMarkers:
        coordinate:
    */
    state:State = {        
        placeDataArray:[],
        region:{
            latitude: 37.266162,
            longitude: 127.000055,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        },
        coordinate:{
            latitude: 37.266162,
            longitude: 127.000055,
        },
        showList: false,
        showListMarkers: true,
    }

    //Update HomeScreen every 0.1 second
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: moment().format() }), 100);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // props를 전달받거나, state가 변할 경우 이 함수를 실행한다.
    // AddPlaceScreen에서 받아온 placeData를 state에 업데이트 시킨다.
    static getDerivedStateFromProps(nextProps: Readonly<HomeProps>, prevState: State) {
        /*===============================================================================
            nextProps에 any를 사용하고 싶은 이유
        =================================================================================
            nextProps의 type은 Readonly<HomeProps>이다.
            그러나 그렇게 할 경우 canIAdd의 값은 Readonly이기 때문에 변경할 수 없게 된다.
            canIAdd의 값이 이 함수 내에서 변경하지 못한다면,
            route.params로 받은 placeData가 무한히 list에 추가될 것이다.
            만약 Readonly가 아니라 그냥 HomeProps로 할 경우
        */


        //첫 실행에서 route.params가 undefined인 경우 이 함수 실행을 막는다.
        //또는 장소 이름을 누르고 state.locationData 변할 때 이 함수 실행을 막는다.
        //또한 params를 받고 나서도 매초 화면이 업데이트 되기에, canIAdd로 막아줄 필요가 있다.
        //이러한 문제 때문에 추후 state 관리를 context로 바꿀 것이다.
        if(nextProps.route.params === undefined || !nextProps.route.params.canIAdd){
            return null;
        }
        else{
            nextProps.route.params.canIAdd = false;
            const newCoordinate:Coordinate = {
                latitude: nextProps.route.params.latitude,
                longitude: nextProps.route.params.longitude,
            };
            const newPlaceData:placeData = {
                key: moment().format(),
                placeName: nextProps.route.params.placeName,
                coordinate: newCoordinate,
            };
            const newPlaceDataArray: placeData[] = [newPlaceData].concat(prevState.placeDataArray);
            return { placeDataArray: newPlaceDataArray, showList: false, showListMarkers: true };
        }
    }
    
    render() {
        //Relative time threshold custom settings
        moment.relativeTimeThreshold('s', 60);
        moment.relativeTimeThreshold('ss', 0);

        //장소 선택 화면 toggler
        const ToggleMarker = () => {
            this.setState({ showListMarkers: !this.state.showListMarkers});
        }

        // 장소의 이름을 누르면 그 장소로 이동한다.
        const PlaceNamePressHandler = (newlatitude: number, newlongitude: number) => {
            const pressedPlaceName:Region = {
                latitude: newlatitude,
                longitude: newlongitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            }
            const pressedCoordinate:Coordinate = {
                latitude: newlatitude,
                longitude: newlongitude,
            }
            this.setState({ locationData: pressedPlaceName })
            this.setState({ coordinate: pressedCoordinate })

            // map이 null일 때 PlaceNamePressHandler함수를 사용자가 사용할 방법은 없지만,
            // 그래도 null일 때 animateToRegion 함수를 불러서는 안된다.
            if(this.map !== null){
                this.map.animateToRegion(pressedPlaceName, 500)
            }
            
        }

        // 장소 추가 버튼을 누르면 화면 전환. 현재 위치에 대한 정보 전달.
        const AddPlacePressHandler = () => {
            this.props.navigation.navigate('AddPlaceScreen', { 
                latitudeInfo: this.state.coordinate.latitude,
                longitudeInfo: this.state.coordinate.longitude,
                })
        }

        // 장소 리스트 화면 on/off 토글러.
        const listViewToggler = () => {
            this.state.showList = !this.state.showList;
            //물론 0.1초마다 HomeScreen이 render되고는 있지만, 
            //사용자가 버튼을 누르는 즉시 다시 render해야 한다.
            this.forceUpdate();
        }
        
        return (
            <View>
                <MapView
                    ref={(map)=>{this.map = map;}}
                    style={styles.mapStyle}
                    initialRegion={this.state.region}
                >
                    {
                        <Marker 
                            draggable 
                            coordinate={this.state.coordinate}
                            pinColor={'green'}
                            onDragEnd={(e) => this.state.coordinate = e.nativeEvent.coordinate }
                            opacity={this.state.showListMarkers? 0: 1}
                        />
                    }
                    {
                        this.state.placeDataArray.map(marker => (
                            <Marker 
                                key={marker.key}
                                coordinate={marker.coordinate}
                                opacity={this.state.showListMarkers? 1: 0}
                            />
                        ))
                    }
                </MapView>

                <TouchableOpacity 
                    style={this.state.showListMarkers?
                        styles.addPlaceButton_Home :
                        styles.hideContainer} 
                    onPress={ToggleMarker} >
                                <Text>장소 추가</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ this.state.showListMarkers?
                        styles.hideContainer :
                        styles.addPlaceButton} 
                    onPress={AddPlacePressHandler} 
                >
                    <Text>추가</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ this.state.showListMarkers?
                        styles.hideContainer :
                        styles.cancelAddButton
                    } 
                    onPress={ToggleMarker} 
                >
                    <Text>취소</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.openListButton} 
                    onPress={listViewToggler}
                    activeOpacity={1} 
                >
                    <Text>열기</Text>
                </TouchableOpacity>


                <View style={this.state.showList ? styles.showListContainer : styles.hideContainer} >
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
                                key={item.key}
                                style={styles.placeList} 
                                onPress={() => 
                                    PlaceNamePressHandler(item.coordinate.latitude, item.coordinate.longitude)} >
                                <Text>{item.placeName}</Text>
                                <Text>{moment(item.key).fromNow()}</Text>
                            </TouchableOpacity>
                        )} 
                    />
                </View>
            </View>
        );
    }
  }

export default HomeScreen;