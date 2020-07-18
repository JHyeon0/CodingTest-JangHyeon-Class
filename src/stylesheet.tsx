import { StyleSheet, Dimensions } from 'react-native';

const windowWidth:number = Dimensions.get("window").width;
const windowHeight:number = Dimensions.get("window").height;

const styles = StyleSheet.create({

    ////////////   General   ////////////
    mapStyle: {
        width: windowWidth,
        height: windowHeight,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputPlaceName:{
        padding: 10,
        margin: 10,
    },

    ////////////   Place List View   ////////////
    showListContainer: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight*0.3,
        backgroundColor: 'white',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hideListContainer: {
        width: 0,
        height: 0,
    },
    emptyList: {
        marginTop: windowHeight*0.10,
    },
    placeList: {
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight*0.06,
        borderStyle: 'solid',
        borderColor: 'rgb(230, 230, 230)',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


    ////////////   Button   ////////////
    openListButton: {
        position: 'absolute', 
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight*0.06,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeListButton: {
        backgroundColor: '#FFBBAC',
        width: windowWidth,
        height: windowHeight*0.06,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPlaceButton_Home: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        position: 'absolute',
        top: '80%',
        alignSelf: 'flex-end'
    },
    cancelAddButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        position: 'absolute',
        top: '80%',
        alignSelf: 'flex-end'
    },
    addPlaceButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: windowWidth,
        height: windowHeight*0.06,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: windowWidth,
        height: windowHeight*0.06,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelSaveButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: windowWidth,
        height: windowHeight*0.2,
        top: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },


 });

export { styles };
