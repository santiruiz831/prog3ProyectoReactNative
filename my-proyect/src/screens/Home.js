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

    render(){
        console.log(this.state);
        return(
            <View style={styles.container}>
                <Text style={styles.contSaludo}>
                <Text style={styles.text}>
                    ¡Hola {this.state.username}!
                </Text>
                </Text>
            {
                this.state.posts.length ?
                <FlatList 
                data={this.state.posts}
                style={styles.flat}
                keyExtractor={post => post.id}
                renderItem = { ({item}) => <Post dataPost={item} {...this.props} />}
            />
            :
            <Text style={styles.noHay}>No hay Posteos</Text>
            
            }
           
        </View>

        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: "#40194f",
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        backgroundColor: '#cbb9d2',
    },
    container: {

        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fdf7ff",
        color: "#616161",
    },
    flat: {
    
        width: "100%",
        flex: 9,
        flexDirection: 'column',
    },
    contSaludo: {
        backgroundColor: '#cbb9d2',
        marginTop: 15,
        width: "100%",
        marginBottom: 20,
        height: 50,
        textAlign: 'center',
    },
    noHay: {
        color: '#40194f',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 20,
        textAlign: 'center',
    }
})

export default Home;