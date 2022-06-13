import React, {Component} from 'react';
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

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            posts: [],
            showModal: false,
            loader: true,
        }
    }


    componentDidMount() {
        db.collection("posts")
            .where("owner", "==", auth.currentUser.displayName)
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
                } // docs
            ); //Snapshot
    } //Component

    addPostRedirect() {
        this.props.navigation.navigate("NewPost");
    }

    showModal() {
        this.setState({
            showModal: true,
        });
    } //Show modal

    closeModal() {
        this.setState({
            showModal: false,
        });
    } //Close modal

    render() {
        return (
            <>
                {this.state.loader ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.inline}>
                                <Text style={styles.username}>
                                    {auth.currentUser.displayName}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        {
                                            this.state.showModal
                                                ? this.closeModal()
                                                : this.showModal();
                                        }
                                    }}
                                >
                                    <Ionicons
                                        style={styles.icon}
                                        name="information-circle-outline"
                                        size="20px"
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.logout()}>
                                    <Ionicons
                                        style={styles.icon}
                                        name="log-out-outline"
                                        size="20px"
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>{" "}
                            {/* inline */}
                            {this.state.showModal ? (
                                <>
                                    <View
                                        animationType="fade"
                                        transparent={false}
                                        visible={this.state.showModal}
                                        style={styles.modal}
                                    >
                                        <Text style={styles.text}>
                                            <Text style={styles.bold}>E-mail:</Text>
                                            <Text style={styles.paddingLeft}>
                                                {auth.currentUser.email}
                                            </Text>
                                        </Text>
                                        <Text style={styles.text}>
                                            <Text style={styles.bold}>
                                                Última fecha de ingreso:
                                            </Text>
                                            <Text style={styles.paddingLeft}>
                                                {auth.currentUser.metadata.lastSignInTime}
                                            </Text>
                                        </Text>
                                        <Text style={styles.text}>
                                            <Text style={styles.bold}>Publicaciones:</Text>
                                            <Text style={styles.paddingLeft}>
                                                {this.state.posts.length}
                                            </Text>
                                        </Text>
                                    </View>
                                </>
                            ) : null}
                        </View>
                        {/* header */}
                        {this.state.posts.length > 0 ? (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={styles.flatlist}
                                data={this.state.posts}
                                keyExtractor={(post) => post.id.toString()}
                                renderItem={({ item }) => <Post dataPost={item} />}
                            />
                        ) : (
                            <View style={styles.other}>
                                <Text style={styles.noPublic}>
                                    No tenés niguna publicación.
                                </Text>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => this.addPostRedirect()}
                                >
                                    <Text>¡Creá tu primer posteo!</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e9e4",
        color: "#ff9f68",
    },
    header: {
        backgroundColor: "#22223b",
        boxSizing: "border-box",
        width: "100%",
        padding: 10,
        position: "relative",
        zIndex: 0,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    inline: {
        flexWrap: "wrap",
        alignItems: "space-between",
        flexDirection: "row",
        margin: 5,
        justifyContent: "space-between",
    },
    icon: {
        margin: 5,
    },
    flatlist: {
        overflow: "hidden",
        width: "100%",
        flex: 9,
        flexDirection: "column",
    },
    other: {
        overflow: "hidden",
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
    text: {
        color: "white",
        textAlign: "center",
        margin: 5,
    },
    noPublic: {
        color: "black",
        textAlign: "center",
        margin: 30,
    },
    username: {
        textAlign: "left",
        color: "white",
        fontWeight: "600",
        fontSize: 15,
        padding: 5,
    },
    modal: {
        border: "none",
        width: "100%",
        marginTop: 10,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    bold: {
        fontSize: "30",
        fontWeight: "bold",
    },
    paddingLeft: {
        paddingLeft: "5px",
    },
});



export default Profile;