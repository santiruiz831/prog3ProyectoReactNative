import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }


    render(){
        console.log(this.props);
        //Incluir en el render un ToucheableOpacity para ejecutar el método de logout que viene del padre. ¿Quién es el padre?
        return(
                <View>
                <Text> Mi Perfil</Text>
                
                </View>
        )
    }

}


export default Profile;