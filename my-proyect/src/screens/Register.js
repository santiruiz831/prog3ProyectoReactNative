import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { auth } from '../firebase/config';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
        }
    }

    onSubmit() {
        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Username'
                    onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style={styles.botton} onPress={() => this.props.route.params.register(this.state.email, this.state.password, this.state.username)}>
                    <Text style={styles.text}>Registrarme</Text>
                </TouchableOpacity>

                <Text style={styles.error}> El error es: {this.props.errores} </Text>

                <TouchableOpacity style={styles.cambiar} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.cambio}>Ya tengo cuenta</Text>
                </TouchableOpacity>

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        height: '100%'
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20,
        color: "#40194f",
        fontSize: 40,
        backgroundColor: '#cbb9d2',
    },
    field: {
        width: "100%",
        textAlign: 'center',
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
        backgroundColor: "#E7F6FF", 
        color: "black"
    },

    botton: {
        backgroundColor: "#91D6B4",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#91D6B4",
        textAlign: 'center',
        padding: 7,
        marginTop: 15,
        borderRadius: 15,
        width: '100%',
    },
    text: {
        color: '#fff',
    },
    error: {
        textAlign: "left",
        color: "#40194f",
        fontWeight: "600",
        fontSize: 20,
        padding: 5,
      },
    cambiar: {
        backgroundColor: '#cbb9d2',
        height: 50,
        color: "white",
        textAlign: "center",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
        width: "100%",
    },
    cambio: {
        color: "#40194f",
        width: '100%',
        textAlign: "center",
        marginTop: 8,

    },
      
})

export default Register;