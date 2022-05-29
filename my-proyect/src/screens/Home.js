import React, {Component} from 'react';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import { db } from '../firebase/config';
import Card from '../components/Card';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posteos: [],
            likes: 0,
            liked: false,
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    console.log(posts)
                this.setState({
                    posteos: posts
                
                }, console.log(this.state.posteos))
                })
            }
        )
        
    }

    incremetar(){
        this.setState({
            numero:this.state.likes +1
        }) //Recibe un objeto literal con el estado que quiero modificar
    }

    decrementar(){
        if(this.state.likes <= 0){
            this.setState({
                numero: this.state.likes -1
            })
        }
    }





    render(){
        return(
            <View>
                {this.state.posteos.length<0?
            <ActivityIndicator />:
            <View>
            <Text>
                Home
            </Text>
            <TouchableOpacity onPress={()=> this.props.logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <FlatList 
               data={ this.state.posteos }
               keyExtractor={ posteo => posteo.id.toString() }
               renderItem={ ({item})=> <Card data={item.data}  ></Card> }
            />
              <TouchableOpacity onPress={()=>this.incremetar()}>
                  <Text>Me gusta {this.state.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.decrementar()}>
                  <Text>Quitar like</Text>
              </TouchableOpacity>
              <Text></Text>
              </View>
    }
            </View>
        )
    }
}


export default Home;