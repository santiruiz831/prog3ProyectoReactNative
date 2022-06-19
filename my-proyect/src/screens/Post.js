import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Comments from "./Comments";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Fontisto } from '@expo/vector-icons'; 

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidadDeLikes: 0,
      myLike: false,
      showCamera: true,
      url: "",
      showModal: false,
      filteredComments: this.props.dataPost.data.comments,
      deletedPostId: this.props.dataPost.data.id,
      id: ''
    };
  }

  componentDidMount() {
    if (this.props.dataPost.data.likes) {
      const cantidadDeLikes = this.props.dataPost.data.likes.length;
      this.setState({
        cantidadDeLikes: cantidadDeLikes,
      });
      if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
        this.setState({
          myLike: true,
        });
      }
    }
  }

  like() {
    db.collection("posts")
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          cantidadDeLikes: this.state.cantidadDeLikes + 1,
          myLike: true,
        })
      )
      .catch((error) => console.log(error));
  }

  unLike() {
    db.collection("posts")
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() =>
        this.setState({
          cantidadDeLikes: this.state.cantidadDeLikes - 1,
          myLike: false,
        })
      )
      .catch((error) => console.log(error));
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  deleteComment(deletedCommentId) {
    let filteredComments = this.props.dataPost.data.comments.filter(
      (element) => element.id != deletedCommentId
    );
    this.setState({
      filteredComments: filteredComments,
    });

    const posteoActualizar = db.collection("posts").doc(this.props.dataPost.id);

    posteoActualizar.update({
      comments: filteredComments,
    });
  }

  deletePost(deletedPostId) {
    const posteoActualizarEliminado = db
      .collection("posts")
      .doc(this.props.dataPost.id)
      .delete();
  }

  render() {
    console.log(this.props.dataPost);
    return (
      <View style={styles.separator}>
        <View style={styles.parteArriba}>
        <Text style={styles.owner}><Ionicons name="person-circle-outline" size="20px" color="#40194f" /> {this.props.dataPost.data.owner}</Text>
        {this.props.dataPost.data.owner == auth.currentUser.email ? (
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              this.deletePost(this.props.dataPost.data.id);
            }}
          >
            <Ionicons name="trash" size="15px" color="red" />
          </TouchableOpacity>
        ) : null}
        </View>
        <Image
          source={{ uri: this.props.dataPost.data.url }}
          style={styles.imagen}
        ></Image>
        <Text>
        {this.state.myLike ? (
          <TouchableOpacity onPress={() => this.unLike()}>
             <Ionicons
                  style={styles.heartIcon}
                  name="heart"
                  size="30px"
                  color="red"
                />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.like()}>
           <Ionicons
                  style={styles.heartIcon}
                  name="heart-outline"
                  size="30px"
                  color="#40194f"
                />
          </TouchableOpacity>
        )}
        <Text style={styles.numer}>{this.state.cantidadDeLikes}</Text>
        </Text>

        <View style={styles.parteAbajo}>
          <Text style={styles.quien}>{this.props.dataPost.data.owner} </Text>
        <Text style={styles.numer}>{this.props.dataPost.data.description}</Text>
        </View>
        

        <TouchableOpacity
         style={styles.commentar}
          onPress={() =>
            this.props.navigation.navigate("Comments", {
              post: this.props.dataPost,
            })
          }
        >
          <Fontisto name="commenting" size={20} color="#40194f" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: "#263238",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#cbb9d2',
    borderRadius: 14,
    marginLeft: 50,
    marginRight: 50,
  },
  imagen: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  inline: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  inlineNear: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  closeModal: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 2,
    marginBottom: 10,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    padding: 10,
    margin: "auto",
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#263238",
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#263238",
    shadowOffset: {
      width: 0,
      height: 2, },
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: 5,
  },
  heart: {
    marginLeft: 10,
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
  },
  paddingLeft: {
    paddingLeft: "5px",
  },
  owner: {
    textAlign: "left",
    color: "#40194f",
    fontWeight: "600",
    fontSize: 20,
    padding: 5,
  },
  commentar: {
    marginBottom: 20,
    marginTop: 10,
  },
  numer: {
    color: 'white'
  },
  parteArriba: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  quien: {
    color: "#40194f",
    fontWeight: "bold",
  },
  parteAbajo: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  }
});

export default Post;
