import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onSubmit() {
    console.log(this.state);
  }

  render() {
    //Falta implementar for de login y el método que viene de mainNavigation
    return (
      <View style={styles.todo}>
        <Text style={styles.bienve}> ¡Bienvenido de vuelta!</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            keyboardType="email-adress"
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />

          <TouchableOpacity
            style={styles.botton}
            onPress={() => this.props.route.params.login(this.state.email, this.state.password)}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <View>{console.log(this.state.email)}</View>
        </View>
        
        <Text style={styles.error}> El error es: {this.props.errores} </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Registro")}
          style={styles.cambiar}
        >
          <Text style={styles.cambio}> No tengo cuenta </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    todo: {
      backgroundColor: "#fdf7ff",
      height: '100%'
      
    },
    bienve: {
      textAlign: 'center',
      fontWeight: '600',
      marginTop: 20,
      color: "#40194f",
      fontSize: 40,
      backgroundColor: '#cbb9d2',
    },
    container:{
      paddingVertical: 10,
      marginTop: 20,
      textAlign: 'center',
    },
    input:{
      width: "100%",
      backgroundColor: "#cbb9d2",
      textAlign: 'center',
      padding: 7,
      marginTop: 5,
      borderRadius: 15,

    },
    botton:{
      backgroundColor: "#91D6B4",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius: 15,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: "#91D6B4",
      padding: 7,
      marginTop: 15,
      borderRadius: 15,
      width: '100%',
    },
    text:{
      color: "#40194f"
    }    ,
    error: {
      textAlign: "left",
      color: "#40194f",
      fontWeight: "600",
      fontSize: 20,
      padding: 5,
    },
    cambiar: {
      backgroundColor: '#cbb9d2',
      height: 50,
      color: "white",
      textAlign: "center",
      padding: 7,
      marginTop: 5,
      borderRadius: 15,
      width: "100%",
    },
    cambio: {
      color: "#40194f",
      width: '100%',
      textAlign: "center",
      marginTop: 8,
      
    },
 })

export default Login;
