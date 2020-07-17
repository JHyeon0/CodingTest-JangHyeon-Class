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

    // 받아온 marker의 정보를 state에 저장한다.
    static getDerivedStateFromProps(nextProps: Object, prevState: State) {
        //undefined인 경우 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            return null;
        }
        else{
            const markerLatitude:number = nextProps.route.params.latitudeInfo;
            const markerLongitude: number = nextProps.route.params.longitudeInfo;

            return { latitude: markerLatitude, longitude: markerLongitude};
        }
    }

    render(){
        
        //저장을 누르면 HomeScreen으로 이동하며 장소에 대한 정보도 전달.
        const pressSaveHandler = () => {
            this.props.navigation.navigate('HomeScreen', {
                key: this.state.newPlaceName + this.state.latitude.toString(),
                placeName: this.state.newPlaceName,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                canIAdd: true,
                });
        }

        return(
            <View style={styles.container}>
                
                <TouchableOpacity 
                    style={styles.cancelSaveButton} 
                    onPress={() => this.props.navigation.navigate('HomeScreen')}
                >
                    <Text>돌아가기</Text>
                </TouchableOpacity>

                <Text>장소의 이름을 입력하세요.</Text>

                <View style={styles.inputPlaceName}>
                    <TextInput 
                        placeholder='장소 이름'
                        value={this.state.newPlaceName} 
                        onChangeText={newPlaceName=> this.setState({newPlaceName})}
                    >
                    </TextInput>
                </View>
                
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={pressSaveHandler}
                >
                    <Text>저장</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default HomeScreen;