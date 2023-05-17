import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import axios from "axios";
import { ProfileContext } from "../Components/profilecontext";
import { useHeaderHeight } from "@react-navigation/elements";

export default function EditProfile({ navigation, route }) {
  const {
    name,
    setName,
    email,
    setEmail,
    Password,
    setPassword,
    contact,
    setContact,
  } = useContext(ProfileContext);
  const screenWidth = Dimensions.get("window").width;
  const screenheight = Dimensions.get("window").height;
  // const [error, seterror] = useState([]);
  const iwidth = screenWidth - 50;

  const handleSave = async () => {
    setName(name);
    setEmail(email);
    setPassword(Password);
    setContact(contact);
    //navigation.goBack();
    console.log(name,email,Password,contact)
      const response = await axios.post(
        "https://fyp-node-backend-deploy-vercel.vercel.app/updateProfile",
        {
          "username": name,
          "password": Password,
          "phone": contact
        }
      );
      console.log(response.status)
    if (response.status === 200) {
      navigation.navigate("Profile");
    }
  
  };
  const handlenav = () => {
    navigation.navigate("Home");
  };
  const height = useHeaderHeight();
  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{
          backgroundColor: "white",
          opacity: 0.8,
          height: 50,
          marginTop: 50,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handlenav();
          }}
        >
          <View
            style={{
              marginLeft: 15,
              borderRadius: 10,
              height: 40,
              width: 40,
              opacity: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
            }}
          >
            <Image
              source={require("../assets/images/left-arrow.png")}
              className=" w-7 h-7"
              //resizeMode="cover"
            ></Image>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            fontSize: 22,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Edit Profile
        </Text>
      </View>
      <Image
        source={require("../assets/images/man.png")}
        style={{ alignSelf: "center", marginTop: 50, height: 140, width: 140 }}
      ></Image>

      <Text
        style={{
          marginTop: 50,
          fontSize: 16,
          color: "white",
          paddingHorizontal: 30,
        }}
      >
        Name
      </Text>

      <TextInput
        style={{
          height: 45,
          marginVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center",
          //textAlign:'center',
          width: iwidth,
          borderRadius: 12,
          backgroundColor: "gray",
          color: "orange",
          fontWeight: "500",
          fontSize: 16,
        }}
        value={name}
        onChangeText={(text) => {
          if (/^[A-Za-z]+$/.test(text) || text === "") {
            setName(text);
          }
        }}
        onBlur={() => {
          if (name.trim() === "") {
            setName("default"); // set a default name or show an error message
          }
        }}
      />
      <Text
        style={{
          marginTop: 5,
          fontSize: 16,
          color: "white",
          paddingHorizontal: 30,
        }}
      >
        Password
      </Text>

      <TextInput
  style={{
    height: 45,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    //textAlign:'center',
    width: iwidth,
    borderRadius: 12,
    backgroundColor: "gray",
    color: "orange",
    fontWeight: "500",
    fontSize: 16,
  }}
  value={Password}
  secureTextEntry={true}
  onChangeText={(text) => setPassword(text)}
/>

      <Text
        style={{
          marginTop: 5,
          fontSize: 16,
          color: "white",
          paddingHorizontal: 30,
        }}
      >
        Contact
      </Text>

      <TextInput
        style={{
          height: 45,
          marginVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center",
          //textAlign:'center',
          width: iwidth,
          borderRadius: 12,
          backgroundColor: "gray",
          color: "orange",
          fontWeight: "500",
          fontSize: 16,
        }}
        value={contact}
        onChangeText={(text) => setContact(text)}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#E36139",
    marginTop: 30,
    width: 160,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
