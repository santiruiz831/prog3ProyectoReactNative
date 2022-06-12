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

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            email: '',
            whoIs: '',
        }
    }

    // Obtener información a partir de una búsqueda.
    search(email) {
        db.collection('posts').where('owner', '==', email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    email: '',
                    whoIs: email,
                })
            }
        )


    }


    render() {
        // console.log(this.state);
        return (
            <View style={styles.container}>
                {/* Si no hay resultados deben mostrar un mensaje al usuario. Puede ser un mensaje único o segmenteado: en caso de que el usuario no exista o si el usuario existe indicar que aún no tiene posteos. */}
                <Text>Posts del usuario: {this.state.whoIs}</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='email a buscar...'
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.search(this.state.email)}
                        //👇 Les dejo un dato sorpresa para los que llegaron hasta acá: así se deshabilita un touchable opacity
                        disabled={this.state.email == '' ? true : false}
                    >
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={post => post.id}
                    renderItem={({ item }) => <Post dataPost={item}
                        {...this.props} />}
                />

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#f2e9e4",
        color: "#ff9f68",
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
        marginBottom: 0,
    },
    button: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: '#fff'
    }
})

export default Search;