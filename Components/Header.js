import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Header = ({ Title, navigation }) => {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.backButton}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{Title}</Text>
        <View style={styles.avatarContainer}>
          <View style={styles.circle2}>
            <View style={styles.circle}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://www.sosyncd.com/wp-content/uploads/2022/06/39-1.png",
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#1d1e1d",
    maxHeight: 100,
    opacity: 80,
    marginBottom: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  backButton: {
    // position: "absolute",
    // left: 16,
    flex: 0.3,
    marginHorizontal: 15,
  },
  title: {
    flex: 1.5,
    fontFamily: "Poppins",
    fontSize: 24,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 1,
  },
  avatarContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  circle: {
    alignItems: "center",
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#1A1A1A",
    borderColor: "#E36139",
    borderWidth: 4,
  },
});

export default Header;
