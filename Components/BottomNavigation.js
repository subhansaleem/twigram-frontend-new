import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { React, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const BottomNavigation = ({ navigation, showNav }) => {
  const animatedValue = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (showNav) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 150,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showNav]);

  const animatedStyle = {
    transform: [{ translateY: animatedValue }],
  };
  return (
    <View>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            backgroundColor: "#131313",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 15,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            marginHorizontal: 16,
            marginVertical: 32,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            opacity: 80,
            elevation: 2,
          },
          animatedStyle,
        ]}
      >
        <View style={styles.leftIconsContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate("Coins");
            }}
          >
            <FontAwesome5 name="coins" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate("Influencers");
            }}
          >
            <Ionicons name="md-people-sharp" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Ionicons name="ios-options-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            navigation.navigate("Addcall");
          }}
        >
          <View style={styles.addButton}>
            <Ionicons name="add" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#131313",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginVertical: 32,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    opacity: 80,
    elevation: 2,
  },
  leftIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  iconContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  addButtonContainer: {
    position: "absolute",
    top: -24,
    right: 16,
    alignItems: "center",
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E36139",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
});
export default BottomNavigation;
