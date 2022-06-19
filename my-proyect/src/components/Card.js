import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class Card extends Component{
    constructor(props){
        super(props)
        console.log(this.props.data.posteo);
       
    }

    render(){
        return(
                <View>
                    <Text>{this.props.data.posteo}</Text>
                </View>
        )
    }
}

export default Card;