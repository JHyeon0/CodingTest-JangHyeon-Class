import React, {Component} from 'react';
import { TextInput, Text, View,TouchableOpacity } from 'react-native';
import { styles } from './stylesheet'

// HomeScreen으로 navigate할 때 placeName, latitude, longtitude 모두 넘겨주어야 함.

interface State{
    newPlaceName: string;
}

class HomeScreen extends Component{
    state:State = {
        newPlaceName: '',
    }


    render(){
        

        const pressSaveHandler = () => {
            
            console.log("\n저장버튼을 눌렀습니다. 홈으로 돌아갑니다.\n");

            const newPlaceName:string = this.state.newPlaceName;

            //canIAdd는 getDerivedStateFromProps실행을 1회만 하기 위함이다.
            this.props.navigation.navigate('HomeScreen', {
                key: newPlaceName,
                placeName: newPlaceName,
                latitude: 37.266162,
                longitude: 127.000055,
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
            </View>
        )
    }
}

export default HomeScreen;