import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image
} from 'react-native';
import Post from './Post';
import { FontAwesome } from '@expo/vector-icons'; 

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            email: '',
            whoIs: '',
            users: [],
            searchInput: "",
            loader: true,
        }
    }

    // Obtener información a partir de una búsqueda.
    componentDidMount() {
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            (docs) => {
                let posts = [];
                docs.forEach(oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
           
           
                })
            }
        );
        db.collection("users")
            
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
                        users: postsAux,
                        loader: false,
                    });
                    ;
                }
            );


    }


    render() {
        
        
        
        return (
            <>
            <View style={styles.container}>
                {this.state.loader ? (
                    <ActivityIndicator size="large" color="blue" /> 
                ) : (
                    <>
              
                        <TextInput
                            style={styles.field}
                            keyboardType='default'
                            placeholder='Email a buscar...'
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({ searchInput: text })}
                        />
                        
              
                {filteredUsers.length > 0 ? (
                    filterPosts.length > 0 ? (
                    <FlatList
                    style={styles.posts}
                    data={filterPosts}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(post) => post.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item}></Post>}
                    />
                ) : (
                    <Text  style={styles.texto}>Lo siento, este usuario aun no hizo un posteo</Text>

                )
                ) : (
                    <Text  style={styles.texto}>Ese usuario no existe. Por favor, prueba con otro.</Text>

                )
                }
                </>
            )}
                
            </View>
</>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7ff",
        color: "#fdf7ff",
    },
    form: {
        flex: 1,
        marginHorizontal: 20,
    },
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8,
        width: '90%'
    },
    button: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff'
    },
    titulo: {
        color: '#40194f',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
    },
    posts: {
        marginTop: 100,
    },
    texto: {
        color: '#40194f',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 20,
        textAlign: 'center',
    }
})

export default Search;