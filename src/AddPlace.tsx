import React, {Component} from 'react';
import { TextInput, Text, View,TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './stylesheet'
import { StackParamList } from './StackParamList';
import { RouteProp } from '@react-navigation/native';


type AddPlaceScreenNavigationProp = 
    StackNavigationProp<StackParamList,'AddPlaceScreen'>;

type AddPlaceScreenRouteProp = 
    RouteProp<StackParamList, 'AddPlaceScreen'>;

type AddPlaceProps = {
  navigation: AddPlaceScreenNavigationProp;
  route: AddPlaceScreenRouteProp;
};

interface State{
    newPlaceName: string;
    latitude: number;
    longitude: number;
};


class AddPlaceScreen extends Component<AddPlaceProps>{

    /*
        *** AddPlaceScreen state ***
        newPlaceName : 사용자로부터 입력 받은 장소 이름 저장
        latitude: 전 화면에서 marker로 선택한 latitude
        longtitude: 전 화면에서 marker로 선택한 longitude
    */
    state: State = {
        newPlaceName: '',
        latitude: 37.286162,
        longitude: 127.005055,
    }

    //받아온 marker의 정보를 state에 저장한다.
    static getDerivedStateFromProps(nextProps: Readonly<AddPlaceProps>) {
        //혹시나 undefined인 경우 이 함수 실행을 막는다.
        if(nextProps.route.params === undefined){
            return null;
        }
        else{
            console.log(nextProps);
            return { 
                latitude: nextProps.route.params.latitudeInfo, 
                longitude: nextProps.route.params.longitudeInfo,
            };
        }
    }

    render(){
        
        //저장을 누르면 HomeScreen으로 이동하며 장소에 대한 정보도 전달.
        const pressSave = () => {
            this.props.navigation.navigate('HomeScreen', {
                placeName: this.state.newPlaceName,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                canIAdd: true,
            });
        }

        return(
            <View style={styles.container}>

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
                    onPress={pressSave}
                >
                    <Text>저장</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default AddPlaceScreen;