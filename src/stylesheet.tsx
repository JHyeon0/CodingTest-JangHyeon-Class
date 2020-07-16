import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeListContainer: {
        position: 'absolute',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.3,
        backgroundColor: 'white',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },


    openPlaceListButton: {

        position: 'absolute', 
        backgroundColor: 'white',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closePlaceListButton: {
        backgroundColor: '#FFBBAC',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeList: {
        backgroundColor: 'white',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
        borderStyle: 'solid',
        borderColor: 'rgb(230, 230, 230)',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


    addPlaceButton_Home: {

        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        position: 'absolute',//use absolute position to show button on top of the map
        top: '80%', //for center align
        alignSelf: 'flex-end' //for align to right
    },

    //////////////////////////////////////////////////////////
    // temporary style have to REMOVE!! ////////////////////    
    debugButton: {

        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        position: 'absolute',//use absolute position to show button on top of the map
        top: '60%', //for center align
        alignSelf: 'flex-end' //for align to right
    },
    debugButton2: {

        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        position: 'absolute',//use absolute position to show button on top of the map
        top: '40%', //for center align
        alignSelf: 'flex-end' //for align to right
    },
    // temporary style have to REMOVE!! ////////////////////
    //////////////////////////////////////////////////////////

    addPlaceButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backToHomeButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.2,
        top: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputPlaceName:{
        padding: 10,
        margin: 10,
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
 });

export { styles };
