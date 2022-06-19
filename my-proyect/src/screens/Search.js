import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import Post from './Post';

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
        db.collection("users").onSnapshot(
                (docs) => {
                    let postsAux = [];
                    docs.forEach((doc) => {
                        postsAux.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }); 
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
        
        let filterPosts =
            this.state.searchInput.length > 0 ? this.state.posts.filter((element) =>
                element.data.owner
                    .toLowerCase()
                    .includes(this.state.searchInput.toLowerCase())
            ) : this.state.posts;
        let filteredUsers =
            this.state.searchInput.length > 0 ? this.state.users.filter((element) =>
                element.data.email
                    .toLowerCase()
                    .includes(this.state.searchInput.toLowerCase())
            ) : this.state.users;

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
                            placeholderTextColor="whithe"
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
    field: {
        borderColor: '#40194f',
        borderWidth: 1,
        borderRadius: 20,
        padding: 3,
        marginBottom: 3,
        width: '100%',
        marginTop: 10,
    },
    posts: {
        marginTop: 20,
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