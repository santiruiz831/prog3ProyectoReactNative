//Estructura base de un componente con estado
import React, { Component } from 'react';

//1 Componentes de navegación
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import de íconos
import { FontAwesome, Foundation } from '@expo/vector-icons'

//2Importar las pantallas
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Search from '../screens/Search';

//3 Guardar la ejecución de createBottomTabNavigator
const Tab = createBottomTabNavigator();

//4 Armar el compoente con el render del menú

class Menu extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn:false,
        }
    }

    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen 
                    name='Home' 
                    
                    options={
                        { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
                    }
                    children = { (navigationProps)=><Home logout={() =>this.props.logout()} {... navigationProps}/>}
                    />
                <Tab.Screen 
                name='Profile' 
                options={
                    { tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }
                }
                children = { (navigationProps)=><Profile logout={() =>this.props.logout()} {... navigationProps}/>}
                />
                <Tab.Screen 
                    name='NewPost' 
                    component={ NewPost }
                    options={
                        { tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> }
                    }
                    
                />
                <Tab.Screen
                    name='Search'
                    component={Search}
                    options={
                        { tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }
                    }
                />       
            </Tab.Navigator>        

        )
    }
}

export default Menu

