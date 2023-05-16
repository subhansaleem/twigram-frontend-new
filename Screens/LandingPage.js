import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import ButtonCmp from "../Components/ButtonCmp";
import { useFonts } from "expo-font";

const LandingPage = ({ navigation }) => {
  const [loaded] = useFonts({
    Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
      <View className="flex-1">
        <ImageBackground
          source={require("../assets/images/BackGround2.jpg")}
          className="flex-1"
        >
          <View className="h-2/3"></View>
          <View className="flex-1 items-center">
            <Text
              className="font-medium text-6xl text-white"
              style={{ padding: 5, fontFamily: "Jost" }}
            >
              TwiGram
            </Text>
            <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate("Login")}
>
  <Text style={styles.loginButtonText}>Login</Text>
</TouchableOpacity>
            <View className="mt-1.5 flex-row">
              <Text className="text-white">Don’t Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={{color:'white', textDecorationLine: "underline", fontWeight:'500', marginLeft:5}}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
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
});

export default LandingPage;

