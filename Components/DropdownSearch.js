import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
const DropDownSearch = (cd, setSelectedCountry) => {
  const [data, setData] = useState(cd["Data"]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const searchRef = useRef();
  const onSearch = (search) => {
    if (search !== "") {
      let tempData = cd["Data"].filter((item) => {
        return (
          String(item.symbol).toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      setData(tempData);
    } else {
      setData(cd["Data"]);
    }
  };

  return (
    <View style={{ zIndex: 30 }}>
      <TouchableOpacity
        style={{
          width: "90%",
          height: 40,
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: "white",
          backgroundColor: "grey",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}
      >
        <Text style={{ fontWeight: "500", color: "white" }}>
          {selectedCountry == "" ? "Select Coin" : selectedCountry}
        </Text>
        {clicked ? (
          <Image
            source={require("../assets/upload.png")}
            style={{ width: 20, height: 20, tintColor: "white" }}
          />
        ) : (
          <Image
            source={require("../assets/dropdown.png")}
            style={{ width: 20, height: 20 }}
          />
        )}
      </TouchableOpacity>
      {clicked ? (
        <Modal transparent={true} visible={clicked}>
          <TouchableWithoutFeedback onPress={() => setClicked(!clicked)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View
            style={{
              position: "absolute",
              top: 150,
              left: 20,
              elevation: 5,
              marginTop: 20,
              height: 300,
              alignSelf: "center",
              width: "90%",
              backgroundColor: "gray",
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={(txt) => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: "90%",
                height: 50,
                alignSelf: "center",
                borderWidth: 0.2,
                borderColor: "#8e8e8e",
                borderRadius: 7,
                marginTop: 20,
                paddingLeft: 20,
                color: "white",
              }}
            />

            <FlatList
              data={data}
              style={{ maxHeight: 230 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      height: 50,
                      justifyContent: "center",
                      borderBottomWidth: 0.5,
                      borderColor: "#8e8e8e",
                      backgroundColor: "gray",
                    }}
                    onPress={() => {
                      setSelectedCountry(item.symbol);
                      setClicked(!clicked);
                      onSearch("");
                      setSearch("");
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{item.symbol}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default DropDownSearch;
