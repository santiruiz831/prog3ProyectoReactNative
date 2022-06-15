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
            <View style={styles.background}>
                <View style={styles.contFlat}>
                    <Text style={styles.titulo}> Mi Perfil</Text>

                    <Text style={styles.username}>
                        {this.state.username}
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.boldText}>
                            {auth.currentUser.email} </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.boldText}>
                            Última fecha de ingreso:
                        </Text>
                        <Text style={styles.paddingLeft}>
                            {auth.currentUser.metadata.lastSignInTime}
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.boldText} >Publicaciones:</Text>
                        <Text style={styles.paddingLeft}>
                            {this.state.posts.length}
                        </Text>
                    </Text>
                    {this.state.posts.length > 0 ? (
                        <FlatList
                            data={this.state.posts}
                            style={styles.flatlist}
                            keyExtractor={(post) => post.id.toString()}
                            renderItem={({ item }) => <Post dataPost={item} {...this.props} />}
                        />
                    ) : (
                        <View style={styles.noFlatlist}>
                            <Text style={styles.textBlack}>
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
        backgroundColor: "#fdf7ff",
        color: "#fdf7ff",
    },

    noFlatlist: {
        width: "100%",
        flex: 9,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    flatlist: {
        overflow: "hidden",
        width: "100%",
        flex: 9,
        flexDirection: "column",
    },

    icon: {
        backgroundColor: "#40194f",
        color: "white",
        textAlign: "center",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
        width: "100%",
    },

    titulo: {
        color: "#40194f",
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        backgroundColor: '#cbb9d2',

    },

    contFlat: {
        flex: 1,
        
    },

    background: {
        backgroundColor: "#fdf7ff",
        flex: 9,
        flexDirection: "column",
    },

    username: {
        textAlign: "left",
        color: "cbb92d",
        fontWeight: "600",
        fontSize: 15,
        padding: 5,
    },

    boldText: {
        fontSize: "30",
        fontWeight: "bold",
        color: "#40194f",

    },
    paddingLeft: {
        paddingLeft: "5px",
    },
    text: {
        padding: 5,
    },

});



export default Profile;