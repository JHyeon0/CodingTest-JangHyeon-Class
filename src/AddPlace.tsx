import React, {Component} from 'react';
import { TextInput, Text, View,TouchableOpacity } from 'react-native';
import { styles } from './stylesheet'

// HomeScreen으로 navigate할 때 placeName, latitude, longitude 모두 넘겨주어야 함.

interface State{
    key: string;
    newPlaceName: string;
    latitude: number;
    longitude: number;
}

class HomeScreen extends Component{
    state:State = {
        key: '',
        newPlaceName: '',
        latitude: 37.286162,
        longitude: 127.005055,
    }

    static getDerivedStateFromProps(nextProps: Object, prevState: State) {
        console.log("Add Place에서 getDerivedStateFromProps 실행됨.");


        //////////////////WARNING!!!!///////////////////////
        ////////////TEXTINPUT 입력중에 계속 이 함수 실행됨////
        ////////////////////////////////////////////////////

        //첫 실행에서 undefined인 경우 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            console.log("undefined. 여기서 걸렀다.");
            return null;
        }
        else{
            console.log("받아온 marker coordinate 정보는 아래와 같다.");
            console.log(`${nextProps.route.params.latitudeInfo} , ${nextProps.route.params.longitudeInfo}`);

            const markerLatitude:number = nextProps.route.params.latitudeInfo;
            const markerLongitude: number = nextProps.route.params.longitudeInfo;

            return { latitude: markerLatitude, longitude: markerLongitude};
        }
    }

    render(){
        

        const pressSaveHandler = () => {
            
            console.log("\n저장버튼을 눌렀습니다. 홈으로 돌아갑니다.\n");

            const newPlaceName:string = this.state.newPlaceName;

            //canIAdd는 getDerivedStateFromProps실행을 1회만 하기 위함이다.
            this.props.navigation.navigate('HomeScreen', {
                key: newPlaceName + this.state.latitude.toString(),
                placeName: newPlaceName,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                canIAdd: true,
            });
        }

        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.backToHomeButton} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                    <Text>돌아가기</Text>
                </TouchableOpacity>

                <View style={styles.inputPlaceName}>
                    <TextInput placeholder='장소 이름을 입력하세요.'
                        value={this.state.newPlaceName} 
                        onChangeText={newPlaceName=> this.setState({newPlaceName})}
                    >
                    </TextInput>
                </View>
                <Text>Hello World! AddPlace.</Text>
                <TouchableOpacity style={styles.addPlaceButton} onPress={pressSaveHandler}>
                    <Text>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.debugButton2} onPress={() =>  console.log(this.state)}>
                    <Text>debug2</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen;