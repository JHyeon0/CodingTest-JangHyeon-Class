import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

    ////////////   General   ////////////
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
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
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.3,
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
        marginTop: Dimensions.get("window").height*0.10,
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


    ////////////   Button   ////////////
    openListButton: {
        position: 'absolute', 
        backgroundColor: 'white',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeListButton: {
        backgroundColor: '#FFBBAC',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
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
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.06,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
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
    cancelSaveButton: {
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


 });

export { styles };
