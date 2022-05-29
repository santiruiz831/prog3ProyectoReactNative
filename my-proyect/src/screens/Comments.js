import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }
    onSubmit(){
        console.log(this.state)
    }
    
    render(){
        return(

            <View style={styles.container}>
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='comment'
                onChangeText={text => this.setState({comment: text})}
            />
    
            
            <TouchableOpacity style={styles.botton} onPress={() => this.onSubmit()}>
                <Text style={styles.text}>Enviar</Text>
            </TouchableOpacity>
            <View>{console.log(this.state.email)}</View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        marginTop: 20
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
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
    },
    text:{
        color: '#fff'
    }
 
     
 })


export default Comments;