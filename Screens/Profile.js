import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ProfileContext } from "../Components/profilecontext";

export default function Profile({ navigation, route }) {
  const { name, email, contact } = useContext(ProfileContext); // get the updated values from the context

  const handlenav = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => {
            handlenav();
          }}
        >
          <Image
            source={require("../assets/images/left-arrow.png")}
            className="mt-11 mx-5 w-6 h-5"
            //resizeMode="cover"
          ></Image>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.circle2}>
            <View style={styles.circle}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
                }}
              />
            </View>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.heading}>My Profile</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                navigation.navigate("EditProfile", {
                  Name: name,
                  Email: email,
                  Contact: contact,
                });
              }}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { marginTop: 15, width: "80%", alignSelf: "center" },
              ]}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    //backgroundColor: "#2A333C",
  },
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  circle: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  circle2: {
    width: 125,
    height: 125,
    borderRadius: 100,
    backgroundColor: "#1A1A1A",
    borderColor: "#E36139",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  userInfoContainer: {
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#E36139",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  email: {
    marginTop: 5,
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.75,
    textAlign: "center",
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#E36139",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#414141",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingLeft: 10,
  },
});
