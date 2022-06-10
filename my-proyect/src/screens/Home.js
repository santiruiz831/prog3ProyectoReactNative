import React, {Component} from 'react';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import { db } from '../firebase/config';
import Post from './Post';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )

        
    }

    render(){
        console.log(this.state);
        return(
            <View>
            <Text>Posteos</Text>
            {
                this.state.posts.length ?
                <FlatList 
                data={this.state.posts}
                keyExtractor={post => post.id}
                renderItem = { ({item}) => <Post dataPost={item} {...this.props} />}
            />
            :
            <Text>No hay Posteos</Text>
            
            }
           
        </View>

        )
    }
}


export default Home;