import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import InputButton from "../Components/InputButton";
import { ProfileContext } from "../Components/profilecontext";
import { useState, useContext } from "react";
import axios from "axios";

const Login = ({ navigation }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    Password,
    setPassword,
    contact,
    setContact,
    accessToken,
    setaccessToken,
  } = useContext(ProfileContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [loaded] = useFonts({
    Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const onClick = async () => {
    try {
      const response = await axios.post(
        "https://fyp-node-backend-deploy-vercel.vercel.app/login",
        {
          username: name,
          password: Password,
        }
      );
      setContact(response.data.phone);
      setaccessToken(response.data.accessToken);
      setEmail(response.data.email);
      console.log(response.data);
      //console.log(email);
      if (response.status === 200) {
        navigation.navigate("Home");
      } else {
        console.log("DSA");
        //console.log("Error message:", loginError); // Check the value of loginError
      }
    } catch (error) {
      setLoginError("Username or password is incorrect.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 items-center">
        <View className="h-1/4"></View>
        <Text
          className="font-extrabold text-4xl text-white"
          style={{ fontFamily: "Jost" }}
        >
          Welcome Back!
        </Text>
        <Text className="text-center text-xs text-white p-2">
          Enter Your Name And Password.
        </Text>
        <View className="h-20"></View>
        <InputButton
          placehlder="Username"
          w={300}
          text={name}
          setText={setName}
        />
        <View style={{ marginTop: 20 }}></View>
        <InputButton
          placehlder="Password"
          w={300}
          text={Password}
          setText={setPassword}
          secureTextEntry={true}
        />
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={onClick}>
          <Text style={styles.loginButtonText}>Send OTP</Text>
        </TouchableOpacity>

        <View className="flex-row p-3">
          <Text className="text-white">Don't Have An Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text
              style={{
                color: "white",
                textDecorationLine: "underline",
                fontWeight: "500",
                marginLeft: 5,
              }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: 250,
    height: 50,
    backgroundColor: "#E36139",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;