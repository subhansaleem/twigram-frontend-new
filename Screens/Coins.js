import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import CoinView from "../Components/CoinView";
import Header from "../Components/Header";
import DropDownSearch from "../Components/DropdownSearch";

export default function Coins({ navigation }) {
  const [coinDetails, setCoinDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFiltered] = useState([]);
  let cd = [];
  useEffect(() => {
    const getData = async () => {
      axios
        .get("https://api.binance.com/api/v3/ticker/24hr")
        .then((res) => {
          setCoinDetails(res.data);
        })
        .catch((e) => console.error(e));
    };
    getData();
  }, []);
  cd = coinDetails.filter((_, v, arr) => {
    if (
      String(arr[v]["symbol"]).slice(-4) === "BUSD" ||
      String(arr[v]["symbol"]).slice(-4) === "USDT"
    ) {
      return arr[v];
    }
  });

  const handleSearch = (search) => {
    console.log(search);
    setFiltered(
      cd.filter((_, v, arr) => {
        if (search != "") {
          if (String(arr[v]["symbol"]).includes(search)) {
            return arr[v];
          }
        } else {
          return arr[v];
        }
      })
    );
  };
  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <CoinView data={item} onPress={handlePress} />
      </View>
    );
  };
  const handleChangeText = (texts) => {
    setSearch(texts);
    handleSearch(search);
  };
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
      <Header navigation={navigation} Title={"Coins"} />
      <View className="rounded-md  border-red-400 bg-slate-500 p-4">
        <TextInput
          placeholder="Enter Coin Name"
          placeholderTextColor={"white"}
          value={search}
          onChangeText={handleChangeText}
        />
      </View>
      <View className="flex-row justify-evenly mt-5 mb-3">
        <Text
          style={{
            fontFamily: "Montserrat",
            marginTop: 3,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            marginRight: 3,
          }}
        >
          Name
        </Text>

        <Text
          style={{
            fontFamily: "Montserrat",
            marginTop: 3,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            marginLeft: 3,
          }}
        >
          Price
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat",
            marginTop: 3,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            marginLeft: 3,
          }}
        >
          Volume
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat",
            marginTop: 3,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            marginLeft: 3,
          }}
        >
          Change
        </Text>
      </View>
      <View style={{ maxHeight: 550 }}>
        <FlatList
          data={cd}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          style={{ marginTop: 10 }}
        />
      </View>
    </ImageBackground>
  );
}
