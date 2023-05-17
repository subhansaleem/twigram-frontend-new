import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { Dimensions } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import Header from "../Components/Header";
import ProgressBar from "../Components/ProgressCircle";

export default function Influencers({ navigation }) {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        await axios
          .get("http://localhost:8080/getInfluencer?sortby=successRate")
          .then((res) => {
            const api_data = res.data;
            setData1(api_data);
            console.log(api_data);
          });
      } catch (e) {
        console.log(e);
      }
    }

    getData();
  }, []);
  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Header navigation={navigation} Title={"Influencers"} />
      <View style={styles.container}>
        <FlatList
          data={data1}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="items-center"
              onPress={() =>
                navigation.navigate("InfluencerProfile", {
                  Name: item.name,
                  TotalCalls: item.totalCalls,
                  ActiveCalls: item.activeCalls,
                })
              }
            >
              <View style={styles.card}>
                <View style={styles.headingContainer}>
                  <Text style={styles.text1}>{item.name}</Text>
                  <ProgressBar fill={item.successRate} />
                </View>
                <View className="flex-row justify-between mx-10">
                  <Text style={styles.text2}>Total Calls</Text>
                  <Text style={styles.text2}>{item.totalCalls}</Text>
                </View>
                <View className="flex-row justify-between mx-10">
                  <Text style={styles.text2}>Active Calls</Text>
                  <Text style={styles.text2}>{item.activeCalls}</Text>
                </View>
                <View className="flex-row justify-between mx-10">
                  <Text style={styles.text2}>Average Duration</Text>
                  <Text style={styles.text2}>{item.averageDuration}</Text>
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: 150,
                  left: 55,
                  width: 250,
                  borderBottomColor: "white",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  alignItems: "center",
                }}
              ></View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  click: {
    width: 30,
    fontSize: 22,
    marginTop: 15,
    height: 120,
    borderRadius: 20,
    backgroundColor: "#4A5663",
    marginRight: 1,
    opacity: 1,
  },
  text1: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.6,
    fontFamily: "Montserrat",
  },

  text2: {
    fontSize: 16,
    color: "white",
    //opacity: 0.9,
    textAlign: "center",
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  headingContainer: {
    flex: 0.4,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  card: {
    width: "90%",
    height: 180,
    borderRadius: 16,
    backdropFilter: "blur(18.7px)",
    webKitBackdropFilter: "blur(18.7px)",
    shadowColor: "#1e272d",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 10,
    backgroundColor: "rgba(255,255,255,0.11)",
    shadowRadius: 48,
    marginVertical: 4,
  },
});
