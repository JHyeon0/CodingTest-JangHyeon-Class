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
        height: windowHeight*0.4,
        backgroundColor: 'white',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hideContainer: {
        display: 'none',
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
        bottom: 0,
        width: windowWidth,
        height: windowHeight*0.06,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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
        position: 'absolute',
        bottom: '10%',
        right: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFBBAC',
        padding: 10,
    },
    cancelAddButton: {
        position: 'absolute',
        bottom: '10%',
        right: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 50,
    },
    addPlaceButton: {
        position: 'absolute',
        bottom: '10%',
        left: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFBBAC',
        padding: 10,
        paddingVertical: 5,
        paddingHorizontal: 50,
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

 });

export { styles };
