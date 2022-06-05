import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth} from '../firebase/config';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            username: '',
        }
    }

    onSubmit() {
        console.log(this.state);
      }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Username'
                    onChangeText={text => this.setState({ username: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity style={styles.botton} onPress={()=>this.props.route.params.register(this.state.email, this.state.password)}>
                    <Text style={styles.text}>Registrarme</Text>
                </TouchableOpacity>  
                
                <Text> El error es: {this.props.errores} </Text>

                 <TouchableOpacity style={styles.botton} onPress={ ()=>this.props.navigation.navigate('Login') }>
                        <Text style={styles.text}>Ya tengo cuenta</Text>
                 </TouchableOpacity>
            
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    },
    botton:{
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 10,
    },
    text:{
        color: '#fff',
    } 
})

export default Register;