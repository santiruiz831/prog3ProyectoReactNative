import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {auth, db} from '../firebase/config';


class NewPost extends Component{
    constructor(props){
        super(props)
        this.state={
            description:'',
            likes:[],
            comments: [],
        }
    }

    guardarPost(){
         db.collection('posts').add({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                description: this.state.description,
                likes:[],
                comments:[]
            })
            .then( response => this.setState({
                description:'',
            },
            ()=>this.props.navigation.navigate('Home')))
            .catch(error => console.log(error) )
    }


    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Nuevo Post</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='description'
                    onChangeText={text => this.setState({ description: text})}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.guardarPost()}>
                    <Text style={styles.buttonText}>Guardar Post</Text>
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
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
    },
    buttonText:{
        color: '#fff'
    }
})
export default NewPost;