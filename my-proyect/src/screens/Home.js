import React, {Component} from 'react';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from './Post';



class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            username: ''
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            (docs) => {
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
        );
        db.collection("users")
            .where("email", "==", auth.currentUser.email)
            // .orderBy("createdAt", "desc")
            .onSnapshot(
                (docs) => {
                    let postsAux = [];
                    docs.forEach((doc) => {
                        postsAux.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }); // For each
                    console.log(postsAux)
                    this.setState({
                        username: postsAux[0].data.userName,
                        loader: false,
                    });
                   ;
                }
            );

        
    }
    filterPost (id) {
        let filteredPost = this.state.posts.filter(
            (element) => element.id != id
        );
        this.setState({
            posts: filteredPost,
        })
    }

    render(){
        console.log(this.state);
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    ¡Hola {this.state.username}!
                </Text>
            <Text>Posteos</Text>
            {
                this.state.posts.length ?
                <FlatList 
                data={this.state.posts}
                style={styles.flat}
                keyExtractor={post => post.id}
                renderItem = { ({item}) => <Post dataPost={item} filterPost={(id) => this.filterPost (id)} {...this.props} />}
            />
            :
            <Text>No hay Posteos</Text>
            
            }
           
        </View>

        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: "black",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
    },
    container: {
        overflow: "hidden",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e9e4",
        color: "#ff9f68",
    },
    flat: {
        overflow: "hidden",
        width: "100%",
        flex: 9,
        flexDirection: 'column',
    },

})

export default Home;