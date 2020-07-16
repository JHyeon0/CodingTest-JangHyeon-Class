import React, {Component, useRef} from 'react';
import { TouchableOpacity, Text, View, Button, FlatList } from 'react-native';
import { styles } from './stylesheet'
import MapView, { Marker } from 'react-native-maps';
import RBSheet from "react-native-raw-bottom-sheet";



interface placeDataObject{
    key: string;
    placeName: string;
    latitude: number;
    longitude: number;
}

interface coordinate{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface State{
    placeDataArray: placeDataObject[];
    locationData: coordinate;
}

const defaultLocation = {
    latitude: 37.266162,
    longitude: 127.000055,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
}

////////
let bool:boolean= true;


class HomeScreen extends React.Component {
    constructor(props: object, nextProps: object){
        super(props);

        console.log("\nnextProps은 아래와 같다.")
        console.log(nextProps);
    }



    // componentDidMount() {
    //     this.setState({
    //       testName: this.props.route.params.testString,
    //     });
    // }

    //console.log를 해보니 nextProps는 object 였고 prevStates는 interface에서 설정한 State.
    static getDerivedStateFromProps(nextProps: object, prevState: State) {
        console.log("getDerivedStateFromProps 실행됨.");

        //첫 실행에서 undefined인 경우 이 함수 실행을 막는다.
        //또는 장소를 눌러 위치를 이동시킬 때, 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            console.log("처음 실행시 받는 정보는 undefined. 여기서 걸렀다.");
            return null;
        }
        if(!nextProps.route.params.canIAdd){
            console.log("장소 눌러 위치 이동시 state 변경되며, 이 때 state 변경 없어야 함.");
            return null;
        }
        else{
            console.log("홈으로 받은 정보는 아래와 같다.")

            const newPlaceData:placeDataObject = {
                key: nextProps.route.params.key,
                placeName: nextProps.route.params.placeName,
                latitude: nextProps.route.params.latitude,
                longitude: nextProps.route.params.longitude,
            }
            console.log(newPlaceData);
            
            //일회성 정보인 canIAdd는 이제 false로 바꾼다.
            nextProps.route.params.canIAdd=false;
            
            const newArray: placeDataObject[] = prevState.placeDataArray.concat(newPlaceData);
            return { placeDataArray: newArray }
        }
    }

    shouldComponentUpdate(newProps, newState){
        console.log("\nshouldComponentUpdate called!");
        return true;
    } 


    state:State = {
        placeDataArray:[
            {
                key: '1',
                placeName: 'place1',
                latitude: 37.276162,
                longitude: 127.000055,
            },
            {
                key: '2',
                placeName: 'place2',
                latitude: 37.256162,
                longitude: 127.000055,
            },
            {
                key: '3',
                placeName: '수원역',
                latitude: 37.266162,
                longitude: 127.000055,
            }
        ],
        locationData:{
            latitude: 37.266162,
            longitude: 127.000055,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        },
    }
    

    
    render() {
        // const { key, placeName, latitude, longitude } = this.props.route.params;
        //debugHandler should be removed!
        const debugHandler = () => {
            console.log("\nDEBUG LOG...");
            this.setState({ locationData: {
                latitude: 37.25,
                longitude: 127.000055,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            } })

            
            console.log(`state.locationData's latitude is ${this.state.locationData.latitude}`)
            //state 변화는 여기서 즉시 일어나지 않는다! 함수가 끝나면 일어남.
        }

        const debugHandler2 = () => {
            console.log("\n@@@@@ CHECK CURRENT STATE @@@@@");
            console.log(this.state);
            console.log("\n@@@@@ CHECK CURRENT STATE.placeDataArray @@@@@");
            console.log(this.state.placeDataArray);
        }
        //debugHandler should be removed!
        /////////////////////////////////

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

                        <Marker coordinate={this.state.locationData }/>

                </MapView>

                <View style={styles.placeListContainer}>
                    <FlatList 
                        data={this.state.placeDataArray}
                        renderItem={({ item }) => (
                        <TouchableOpacity style={styles.placeList} onPress={() => placeNamePressHandler(item.latitude, item.longitude)}>
                            <Text>{item.placeName}</Text>
                        </TouchableOpacity>
                        )} 
                    />
                </View>

                <TouchableOpacity style={styles.addPlaceButton_Home} onPress={() => this.props.navigation.navigate('SelectPlaceScreen')}>
                    <Text>장소 추가</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.debugButton2} onPress={debugHandler2}>
                    <Text>debug2</Text>
                </TouchableOpacity>

                {/*=========================================================================================================
                    아래 주석 코드 : on/off bottom sheet 구현
                   ---------------------------------------------------------------------------------------------------------                             
                    RBSheet package를 사용하여 on/off bottom sheet를 구현하는 코드임.
                    그러나 state는 바뀜에도 불구하고, 보이는 list가 업데이트 되지 않는 문제 발생. 
                    아래 코드 중 <FlatList />를 그대로 가져와 위 코드로 구현했을 때, list 업데이트 문제 없음.
                ===========================================================================================================*/}
                {/* <View>
                    <TouchableOpacity style={styles.openPlaceListButton} onPress={() => { 
                        this.RBSheet.open();
                        this.forceUpdate();
                        }}>
                        <Text>열기</Text>
                    </TouchableOpacity>
                    <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    customStyles={{wrapper: {backgroundColor: "transparent"}}}
                    openDuration={0}
                    closeOnPressMask={false}
                    >
                        <TouchableOpacity style={styles.closePlaceListButton} onPress={() =>  this.RBSheet.close() }>
                            <Text>닫기</Text>
                        </TouchableOpacity>
                        <View >
                            <FlatList 
                                
                                data={this.state.placeDataArray}
                                extraData={this.state.placeDataArray}
                                renderItem={({ item }) => (
                                <TouchableOpacity style={styles.placeList} onPress={() => placeNamePressHandler(item.latitude, item.longitude)}>
                                    <Text>{item.placeName}</Text>
                                </TouchableOpacity>
                                )} 
                            />
                        </View>
                    </RBSheet>
                </View> */}




            </View>
        );
    }
  }

export default HomeScreen;