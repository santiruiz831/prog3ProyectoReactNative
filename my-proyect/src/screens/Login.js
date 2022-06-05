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
      <View>
        <Text> Login</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            keyboardType="email-adress"
            placeholder="email"
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="password"
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
        
        <Text> El error es: {this.props.errores} </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Registro")}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        marginTop: 20
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    botton:{
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    text:{
        color: '#fff'
    }    
 })

export default Login;
