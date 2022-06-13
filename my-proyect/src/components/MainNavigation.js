import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

//Importar navegaciones
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Guardar la ejecución de Stack
const Stack = createNativeStackNavigator();

//importar las screens o lo que necesite el menú
import Login from '../screens/Login';
import Register from '../screens/Register';
import Menu from './Menu';
import Comments from '../screens/Comments';

class MainNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            registerError: '',
            loginError: '',
        }
    }

    componentDidMount() {

        auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) this.setState({ loggedIn: true })

        })


    }


    login(mail, password) {
        auth.signInWithEmailAndPassword(mail, password)
            .then(response => console.log(response))
            .catch(error => {
                console.log(error);
                this.setState({
                    loginError: error.message
                })
            })
    }

    register(email, password, username) {

        auth.createUserWithEmailAndPassword(email, password, username)
            .then(responseRegister => {
                console.log(responseRegister);
                db.collection('users').add({
                    email: email,
                    userName: username,
                    createdAt: Date.now()
                })
                    .then(responseUsers => console.log(responseUsers))
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    registerError: error.message
                })
            })
    }

    logout() {
        //console.log('hola')
        auth.signOut()
            .then(() => this.setState({ loggedIn: false }))
            .catch(error => console.log(error))
    }


    render() {
        console.log('En el render del menu ' + this.state.registerError)
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        this.state.loggedIn ?
                        <Stack.Group>
                            <Stack.Screen
                                name='Menu'
                                options={{ headerShown: true }}
                                children={(navigationProps) => <Menu logout={() => this.logout()} {...navigationProps} />}
                            />
                            <Stack.Screen 
                                name='Comments'
                                component={ Comments }
                            />
                            </Stack.Group>

                            :
                            <Stack.Group>
                                <Stack.Screen
                                    name='Login'
                                    options={{ headerShown: false }}
                                    initialParams={{ login: (mail, password) => this.login(mail, password) }}
                                    children={(navigationProps) => <Login errores={this.state.loginError} {...navigationProps} />}
                                />
                                <Stack.Screen
                                    name='Registro'
                                    options={{ headerShown: false }}
                                    initialParams={{ register: (mail, pass, username) => this.register(mail, pass, username) }}
                                    children={(navigationProps) => <Register errores={this.state.registerError} {...navigationProps} />}
                                />

                            </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }



}

export default MainNavigation
