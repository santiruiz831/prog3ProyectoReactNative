import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image, 
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import Comments from './Comments';
import Ionicons from "react-native-vector-icons/Ionicons";

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
           //cantidadDeLikes:this.props.dataPost.data.likes.length,
           cantidadDeLikes: 0,
           myLike:false,
           showCamera: true,
           url: '',
           showModal: false,
           filteredComments: this.props.dataPost.data.comments,

        }
    }

    componentDidMount(){
        if (this.props.dataPost.data.likes) 
        {
            const cantidadDeLikes = this.props.dataPost.data.likes.length
            this.setState({
                cantidadDeLikes: cantidadDeLikes
            })
            if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    myLike: true,
                })
            }
        } 

    }

    like(){
        //Agregar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes + 1,
                myLike: true,
            }))
            .catch(error => console.log(error))

    }

    unLike(){
        //Agregar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1,
                myLike: false
            }))
            .catch(error => console.log(error))

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


    render(){
        console.log(this.props.dataPost);
        return(
                <View style={styles.separator}>

                    <Text>Post de: {this.props.dataPost.data.owner}</Text>
                    <Image 
                    source ={{uri: this.props.dataPost.data.url}} 
                    style={styles.imagen}
                    > 

                    </Image>
                    <Text>Texto del Post: {this.props.dataPost.data.description}</Text>
                     <Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {
                        this.state.myLike ?
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <Text>Quitar Like</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <Text>Like</Text>
                        </TouchableOpacity>                
                    }  
                {this.state.showModal ? (
                    <>
                        <TouchableOpacity
                            style={styles.inline}
                            onPress={() => {
                                this.closeModal();
                            }}
                        >
                            <Ionicons
                                style={styles.heart}
                                name="chatbubble-ellipses"
                                size="20px"
                                color="white"
                            />
                            <Text style={styles.text}>
                                {this.props.dataPost.data.comments.length}
                            </Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={this.state.showModal}
                            style={styles.modal}
                        >
                            <Comments
                                comments={this.props.dataPost.data.comments}
                                closeModal={() => this.closeModal()}
                                postId={this.props.dataPost.id}
                                deleteComment={(deletedCommentId) =>
                                    this.deleteComment(deletedCommentId)
                                }
                                filteredComments={this.state.filteredComments}
                            />
                        </Modal>
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.inline}
                        onPress={() => {
                            this.showModal();
                        }}
                    >
                        <Ionicons
                                style={styles.heart}
                            name="chatbubble-ellipses-outline"
                            size="20px"
                            color="white"
                        />
                        <Text style={styles.text}>
                            {this.props.dataPost.data.comments.length}
                        </Text>
                    </TouchableOpacity>
                )}
                </View>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal:20
    },
    imagen: {
       height: 100,
        width: 200,
    },
    image: {
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
    container: {
        flex: 1,
        width: "90%",
        justifyContent: "center",
        padding: 10,
        margin: "auto",
        marginTop: 15,
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#4A4E69",
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
})

export default Post;