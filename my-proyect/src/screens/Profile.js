import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Post from "./Post"
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            posts: [],

        }
    }


    componentDidMount() {
        db.collection("posts")
            .where("owner", "==", auth.currentUser.email)
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
                    this.setState({
                        posts: postsAux,
                        loader: false,
                    });
                    console.log(this.state.posts);
                }
            )
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


    render() {
       console.log(this.state.username)
        return (
            <View style={styles.contFlat}>
                <Text style={styles.titulo}> Mi Perfil</Text>
                <Text>
                    {this.state.username} 
                </Text>
                <Text>
                    {auth.currentUser.email} 
                </Text>
                <Text>
                    Última fecha de ingreso:
                </Text>
                <Text>
                    {auth.currentUser.metadata.lastSignInTime}
                </Text>
                <Text>
                    <Text >Publicaciones:</Text>
                    <Text >
                        {this.state.posts.length}
                    </Text>
                </Text>
                {this.state.posts.length > 0 ? (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(post) => post.id.toString()}
                        renderItem={({ item }) => <Post dataPost={item} {...this.props}/>}
                    />
                ) : (
                    <View style={styles.noFlatlist}>
                        <Text>
                            No tenés niguna publicación.
                        </Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => this.props.logout()}>
                    <Ionicons
                        style={styles.icon}
                        name="log-out-outline"
                        size="20px"
                        color="white"
                    />
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e9e4",
        color: "#ff9f68",
    },
    noFlatlist: {
        width: "100%",
        flex: 9,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#ffb703",
        color: "black",
        textAlign: "center",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
        width: "80%",
    },
    titulo: {
        color: "black",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    },
    contFlat: {
        flex: 1,
    }
});



export default Profile;