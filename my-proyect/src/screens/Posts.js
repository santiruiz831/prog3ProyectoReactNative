import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {auth, db} from '../firebase/config';


class Posts extends Component{
    constructor(props){
        super(props)
        this.state={
            owner: '',
            createdAt: '',
            text: '',
            comments: []
        }
    }

    posteos(){
        db.collection('posts').add({
            email: auth.currentUser.email,
            posteo: this.state.text,
            createdAt: Date.now()
        })
        .then( responseUsers => console.log(responseUsers))
        .catch(error => console.log(error))
    }

    
    render(){
        return(
                <View>
                <Text>Posteos</Text>
                <TouchableOpacity onPress={()=> this.posteos()}>
                    <Text>Agregar posteo</Text>
                </TouchableOpacity>
                <TextInput style={styles.text} onChangeText={(texto) => this.setState({text: texto})}></TextInput>
                </View>
        )
    }

}

const styles = StyleSheet.create({
    text:{
        borderWidth: 4 
    }, 
})

export default Posts;