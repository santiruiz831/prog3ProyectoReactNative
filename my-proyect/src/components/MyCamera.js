import React, { Component } from 'react';
import {
        View,
        Text,
        TouchableOpacity,
        StyleSheet,
        Image,
} from 'react-native';

import {Camera} from 'expo-camera';
import {db,storage} from '../firebase/config';
import Ionicons from "react-native-vector-icons/Ionicons";

class MyCamera extends Component {

    constructor (props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true, 
            url: ''
        }
        console.log(props);
        this.metodosDeCamara = ''   //se rellena con los metodos de camra del render
    }

    componentDidMount(){ //hay que pedir los permisos. si tengo muestro camara y sino texto
        Camera.requestCameraPermissionsAsync()
            .then( ()=> this.setState({ 
                    permission:true,
                })
            )
            .catch (error => console.log(error))
    }
    takePicture() {  //usamos metodo de la camara para sacar la foto, guarda en url temporal asique necesitamos obtenerla para guardarla en estado. //usar un método de la cámara para sacar la foto.abs
        this.metodosDeCamara.takePictureAsync ()
        .then( photo => {
            this.setState ({
                url: photo.uri,  //obtener la url temporal para guardarla en un estado.
                showCamera: false,

            })

        })
        .catch()
    }
    savePicture(){ //copiar de la diapo
        fetch (this.state.url)
            .then( response => response.blob())
            .then(
                image =>{
                    const ref = storage.ref(`photos/${Date.now()}.jpg`);
                    ref.put(image)
                        .then( ()=> {
                            ref.getDownloadURL()
                            .then( url => {
                                console.log(this.props);
                                this.props.onImageUpload(url) //tiene qu venir del padre
                            })
                        })
                        .catch(error => console.log(error))
                }
            )
            .catch (error => console.log (error))
    }
    
    eliminatePreview() {
        this.setState({
            photo: "",
            showCamera: true
        });
    }
    render (){
        return(
                <View style={styles.cameraBody}>
                    {this.state.permission ? 
                        this.state.showCamera ?

                            <View style={styles.cameraBody} > 
                                <Camera
                                    style={styles.cameraBody}
                                    type= {Camera.Constants.Type.front}
                                    ref=  {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}   //pasarle a la clase los metodos de la camara
                                />
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={()=>this.takePicture()}>       
                                    <Text style={styles.text}> Tomar foto </Text> 
                                </TouchableOpacity>       
                            </View> 
                            :
                            <View style={styles.previewContainer}>
                                <Image
                                    style={styles.preview}
                                    source={{ uri: this.state.url }}
                                    resizeMode = 'cover'
                                />
                            <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttons}
                                onPress={() => this.savePicture()}>
                                <Ionicons name="checkmark-circle-outline" size="50px" color="green" />
                            </TouchableOpacity>       
                            <TouchableOpacity
                                style={styles.buttons}
                                onPress={() => this.eliminatePreview()}>
                                <Ionicons name="close-circle-outline" size="50px" color="red" />
                            </TouchableOpacity> 
                            </View>   
                            </View>
                    :
                     <Text> No tengo permisos de cámara </Text>
                }
                </View>
        )
    }

}
const styles = StyleSheet.create ({
    cameraBody: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        borderRadius: 15
    },
    button: {  
        color: "white",
        textAlign: "center",
        padding: 7,
        borderRadius: 15,
        width: "100%",
        backgroundColor: "#40194f",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#40194f",
        marginTop: 15,
        margin: 10,
        alignContent: 'center',
    },
    text:{
        color: 'white'
    },
    preview: {
        height: '100%',
        width: '100%',
        borderRadius: 4
    },
    previewContainer: {
        height: '80%'
    },
    buttons: {
        alignItems: 'center',
    },
    buttonContainer:{
        marginTop: 20,
        backgroundColor: "#cbb9d2",
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        
       
    },
 
    
    
})

export default MyCamera;
