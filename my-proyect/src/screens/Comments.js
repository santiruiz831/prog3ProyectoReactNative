import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';


class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:this.props.route.params.post.data.comments,
            commentText:'',
        }
    }

    componentDidMount(){
        //Obtener todos los comentarios de un posteo para renderizarlos. Hay que usar el id que recibimos por parámetro.
        db.collection('posts')
        .doc(this.props.route.params.post.id)
        .onSnapshot( doc => {
                this.setState({
                    comments:doc.data().comments
                })
            }
        )
    }

    //Agregar comentario tiene que agregar un comentario dentro de un posteo. Puntualmente dentro de un array de comentarios.
    agregarComentarios(){
        if (this.state.commentText == '' ) {
            return 
        } else {
        //actualizar una colleción.
        db.collection('posts')
        .doc(this.props.route.params.post.id) //Cual es el posteo en donde voy a poner un nuevo comentario. Puedo usar route?
        .update({
            comments:firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                text:this.state.commentText,
                createdAt: Date.now()
            })
        })
        .then( () => {
            this.setState({
                commentText: '',
            })
        })
        .catch(error => console.log(error));
        }
    }

    render(){
        console.log(this.props);
        return(
                <View style={styles.contenedor}>
                    <Text style={styles.titulo}> Comentarios</Text>
                    {/* Renderizar la lista de comentarios del posteo */}
                   
                    {this.state.comments.length == 0 ?
                    <Text style={styles.aun}>Aun no hay comentarios! Se el primero en comentar</Text>
                    :
                    <View style={styles.flat}>
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={ posts => posts.id}
                        renderItem = { ({item}) => <View style={styles.commenta}>
                        <Text style={styles.quien}>{item.owner}:</Text> <Text>{item.text}</Text>
                        </View> }
                    />
                    </View>
                    }
                    
                 
                    {/* Un formulario para cargar un comentario */}
                    
                        <TextInput 
                        style={styles.field}
                        keyboardType='default'
                        placeholder='Agregar un comentario'
                        onChangeText={text => this.setState({ commentText: text})}
                        value={this.state.commentText}
                        />

                        <TouchableOpacity style={styles.button} onPress={()=>this.agregarComentarios()}>
                            <Text style={ styles.buttonText}>Comentar</Text>
                        </TouchableOpacity>  
                  
                </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 15,
        padding: 3,
        marginBottom: 8,
        width: '100%',
        marginLeft: 10,

    },
    button: {
        borderRadius: 15,
        padding:3,
        backgroundColor: 'green',
        height: 25,
    },
    buttonText:{
        color: '#fff',
        marginLeft: 10,
    },
    contenedor: {
        backgroundColor: "#fdf7ff",
    },
    titulo: {
        color: "#40194f",
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        backgroundColor: '#cbb9d2',
    },
    aun: {
        color: '#40194f',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    flat: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
    },
    commenta: {
        flexWrap: "wrap",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    quien: {
        color: "#40194f",
    fontWeight: "bold",
    },
    
})

export default Comments;