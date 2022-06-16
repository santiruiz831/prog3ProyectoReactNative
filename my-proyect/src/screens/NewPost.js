import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera';


class NewPost extends Component{
    constructor(props){
        super(props)
        this.state={
            description:"",
            likes:[],
            showCamera: true,
            url: ''
        }
    }
    
    guardarPost(){
         db.collection('posts').add({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                description: this.state.description,
                likes:[],
                comments:[],
                url: this.state.url
            })
            .then( response => this.setState({
                description:'',
                photo: "",
                showCamera: true,
            },
            ()=>this.props.navigation.navigate('Home')))
             .catch((error) => {
                 alert("No se pudo crear tu publicación.");
             });
    }
    
    onImageUpload (url){
        this.setState({
            url: url,  //le pasamos al estado lo que viene por paramewtros
            showCamera: false,
        })
    }

    render(){
        return(
          
                <View style={styles.container}> 
                    {
                    this.state.showCamera ?
                        <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> 
                    :
                        <View style={styles.container}>
                            <TextInput
                                style={styles.field}
                                keyboardType='default'
                                placeholder='description'
                                onChangeText={text => this.setState({ description: text })}
                                multiline
                                value={this.state.description}
                            />
                            
                            <TouchableOpacity style={styles.button} onPress={() => this.guardarPost()}>
                                <Text style={styles.buttonText}>Publicar</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
           
            
        )   
    }
}

const styles = StyleSheet.create({
   
    container:{
        paddingHorizontal:10,
        marginTop: 5,
        height: '99%',
        backgroundColor: "#fdf7ff",
    },
    
    button: {
        color: "white",
        backgroundColor: "#40194f",
        textAlign: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#40194f',
        marginTop: 15,
        width: '100%',
        padding: 7,
        margin: 10,
      
    },
    buttonText:{
        backgroungColor: '#40194f',
        textAlign: 'center',
        fontFamily: 'helvetica',
        justifyContent: "center",
        color: "white"
    },
 
    field: {
        color: "white",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: "rgba(0, 0, 0, 0.247)",
    },
    
});

export default NewPost;