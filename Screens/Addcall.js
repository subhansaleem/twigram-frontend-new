import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import Header from "../Components/Header";
import { useEffect } from "react";
import Leverage from "../Components/Leverage";
import { ProfileContext } from "../Components/profilecontext";

export default function Addcall({ navigation }) {

  const DEVICE_WIDTH = Dimensions.get("window").width;
  const iwidth = DEVICE_WIDTH - 40;
  const [longshort, setlongshort] = useState("");
  const [buysell, setbuysell] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");
  const [t3, sett3] = useState("");
  const [stoploss, setstoploss] = useState("");
  const newErrors = [];
  const [target1field, settarget1field] = useState("");
  const [target2field, settarget2field] = useState("");
  const [target3field, settarget3field] = useState("");
  const [stoplossfield, setstoplossfield] = useState("");
  const [calldurationfield, setcalldurationfield] = useState("");
  const [calltypefield, setcalltypefield] = useState("");
  const [leveragefield, setleveragefield] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leverage, setleverage] = useState([]);
  const [selectedconversion, setSelectedconversion] = useState("USDT");

  const { name, setName } = useContext(ProfileContext);
  const [errors, setErrors] = useState("");

  const handleSaveData = async () => {

    if (longshort === "") {
      newErrors.push("Call Duration is required.");
      setcalldurationfield("Required");
    }

    if (buysell === "") {
      newErrors.push("Call Type is required.");
      setcalltypefield("Required");
    }
  
    if (t1 === "") {
      newErrors.push("Target 1 is required.");
      settarget1field("Required");
    }
    if (t2 !== "" && parseFloat(t2) < parseFloat(t1)) {
      newErrors.push("Target 2 cannot be smaller than Target 1");
      settarget2field("Incorrect Value");
    }
  
    if (t3 !== "" && parseFloat(t3) < parseFloat(t2)) {
      newErrors.push("Target 3 cannot be smaller than Target 2");
      settarget3field("Incorrect Value");
    }
  
    if (t3 !== "" && parseFloat(t3) < parseFloat(t1)) {
      newErrors.push("Target 3 cannot be smaller than Target 1");
      settarget3field("Incorrect Value");
    }
    if (leverage === "") {
      newErrors.push("Leverage is required");
      setleveragefield("Required");
    }
    if (stoploss === "") {
      newErrors.push("Stoploss is required.");
      setstoplossfield("Required");
    }

    setErrors(newErrors);
  
    if (newErrors.length === 0) {
      setIsModalVisible(true);
      let Targets = [];
      Targets.push(t1);
      Targets.push(t2);
      Targets.push(t3);

      const Timestamp = new Date().getTime();
      const data = {
        Name: name,
        Timestamp: Timestamp,
        call: {
          Coin: selectedCoin,
          Conversion: selectedconversion,
          Type: buysell,
          Duration: longshort,
          Targets: Targets,
          Stoploss: stoploss,
          Leverage: leverage,
        },
      };

      await axios
        .post("https://fyp-node-backend-deploy-vercel.vercel.app/addcall", {
          Name: name,
          Timestamp: Timestamp,
          call: {
            Coin: selectedCoin,
            Conversion: selectedconversion,
            Type: buysell,
            Duration: longshort,
            Targets: Targets,
            Stoploss: stoploss,
            Leverage: leverage,
          },
        })

        .then((response) => {
          // Handle the API response
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };
  const [Targetobject, setTargetobject] = useState("");
  const [Targetobject1, setTargetobject1] = useState("");
  const [coinDetails, setCoinDetails] = useState([]);
  const handleAddTargets = () => {
    setTargetobject("True");
  };
  const handleAddTarget1 = () => {
    setTargetobject1("True");
  };
  const handleLeverageChange = (value) => {
    const leverages = [...leverage];
    if (leverages.includes(value)) {
      setleverage(leverages.filter((item) => item !== value));
    } else {
      setleverage([...leverages, value]);
    }
  };
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [cd, setCd] = useState([]);
  useEffect(() => {
    // Fetch coin details from the API

    axios.get('https://api.binance.com/api/v3/ticker/24hr')
      .then(response => {
        setCd(response.data);
      })
      .catch(error => {

        console.log(error);
      });
  }, []);
  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ marginTop: 10 }}></View>
      <Header Title={"Make A Call"} navigation={navigation} />

      <View>

  <Text
    style={{
      fontSize: 17,
      marginLeft: 28,
      color: "white",
      marginTop: 10,
      marginBottom: 2,
    }}
  >
    Coin Name
  </Text>
  <View style={{ width: iwidth, alignSelf: "center" }}>
    <Picker
      style={{
        marginTop: 10,
        backgroundColor: "grey",
        borderColor: "white",
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: "white"
      }}
      selectedValue={selectedCoin}
      onValueChange={(itemValue) => setSelectedCoin(itemValue)}
      mode="dropdown" // Use dropdown mode to show the picker box
    >
      {cd.map((item, index) => (
        <Picker.Item key={index} label={item.symbol} value={item.symbol} />
      ))}
    </Picker>
  </View>
</View>


      <View
        style={{
          marginTop: 25,
          width: iwidth,
          alignSelf: "center",
          backgroundColor: "grey",
          borderColor: "white",
          borderWidth: 0.5,
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            height: 25,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
              alignItems: "center",
              marginLeft: 12,
              marginRight: 19,

              //padding: 5,
              //padding: 5,
            }}
          >
            Call Duration
          </Text>

          <RadioButton
            value="Long"
            status={longshort === "Long" ? "checked" : "unchecked"}
            onPress={() => setlongshort("Long")}
          />
          <Text style={{ color: "white", marginLeft: 8, marginRight: 8 }}>
            Long
          </Text>
          <RadioButton
            value="Short"
            status={longshort === "Short" ? "checked" : "unchecked"}
            onPress={() => setlongshort("Short")}
          />
          <Text style={{ color: "white", marginLeft: 8, marginRight: 8 }}>
            Short
          </Text>
        </View>
        {calldurationfield ? (
          <>
            <Text style={{ marginTop: 2, color: "red", marginLeft: 2 }}>
              Required *
            </Text>
          </>
        ) : null}
        <View
          style={{ marginTop: 3, flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
              alignItems: "center",
              marginLeft: 8,
              padding: 5,
            }}
          >
            Call Type
          </Text>

          <View style={{ marginLeft: 43 }}></View>
          <RadioButton
            value="Buy"
            status={buysell === "Buy" ? "checked" : "unchecked"}
            onPress={() => setbuysell("Buy")}
          />
          <Text style={{ color: "white", marginLeft: 8, marginRight: 8 }}>
            Buy
          </Text>
          <View style={{ marginLeft: 8 }}></View>
          <RadioButton
            value="Sell"
            status={buysell === "Sell" ? "checked" : "unchecked"}
            onPress={() => setbuysell("Sell")}
          />
          <Text style={{ color: "white", marginLeft: 8, marginRight: 8 }}>
            Sell
          </Text>
        </View>
        {calltypefield ? (
          <>
            <Text style={{ marginTop: 2, color: "red", marginleft: 38 }}>
              Required *
            </Text>
          </>
        ) : null}
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            marginLeft: 28,
            color: "white",
            marginTop: 10,
            marginBottom: 2,
          }}
        >
          Exchange Conversion
        </Text>
        <Picker
          placeholder="Select a conversion"
          style={{
            marginTop: 10,
            width: iwidth,
            alignSelf: "center",
            backgroundColor: "grey",
            borderColor: "white",
            borderWidth: 0.5,
            borderRadius: 8,
            padding: 12,
            color: "white",
            //marginBottom: 10,
          }}
          selectedValue={selectedconversion}
          onValueChange={(itemValue) => setSelectedconversion(itemValue)}
          prompt="Exchange"
          itemStyle={{ color: "white" }}
        >
          <Picker.Item label="USDT" value="USDT" />
          <Picker.Item label="BUSD" value="BUSD" />
        </Picker>
      </View>

      <View
        style={{
          marginTop: 15,
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            marginTop: 10,
            width: iwidth - 15,
            backgroundColor: "grey",
            borderRadius: 8,
            padding: 10,
            //marginBottom: 10,
            marginRight: 5,
            marginLeft: 10,
            borderColor: "white",
            borderWidth: 0.5,
          }}
          value={t1}
          onChangeText={(text) => {
            if (/^\d*\.?\d*$/.test(text) || text === "") {
              sett1(text);
            }
          }}
          placeholder="Target 1"
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={handleAddTargets}>
          <Text style={{ color: "white", fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </View>
      {target1field ? (
        <>
          <Text style={{ marginTop: 2, color: "red", marginLeft: 20 }}>
            Required *
          </Text>
        </>
      ) : null}
      {Targetobject ? (
        <View
          style={{
            marginTop: 15,
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              marginTop: 10,
              width: iwidth - 15,
              backgroundColor: "grey",
              borderRadius: 8,
              borderColor: "white",
              borderWidth: 0.5,
              padding: 10,
              //marginBottom: 10,
              marginRight: 5,
              marginLeft: 10,
            }}
            value={t2}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text) || text === "") {
                sett2(text);
              }
            }}
            placeholder="Target 2"
            placeholderTextColor="white"
          />
          <TouchableOpacity onPress={handleAddTarget1}>
            <Text style={{ color: "white", fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {target2field ? (
        <>
          <Text style={{ marginTop: 2, color: "red", marginLeft: 20 }}>
            Incorrect Value
          </Text>
        </>
      ) : null}
      {Targetobject1 ? (
        <View
          style={{ marginTop: 15, alignSelf: "center", flexDirection: "row" }}
        >
          <TextInput
            style={{
              marginTop: 10,
              width: iwidth,
              alignSelf: "center",
              backgroundColor: "grey",
              borderRadius: 8,
              padding: 10,
              borderColor: "white",
              borderWidth: 0.5,
              //marginLeft:5,
              //marginBottom: 10,
            }}
            value={t3}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text) || text === "") {
                sett3(text);
              }
            }}
            placeholder="Target 3"
            placeholderTextColor="white"
          />
        </View>
      ) : null}
      {target3field ? (
        <>
          <Text style={{ marginTop: 2, color: "red", marginleft: 20 }}>
            Incorrect Value
          </Text>
        </>
      ) : null}
      <View
        style={{
          marginTop: 25,
          width: iwidth,
          alignSelf: "center",
          backgroundColor: "grey",
          borderRadius: 8,
          padding: 10,
          borderColor: "white",
          borderWidth: 0.5,
          //marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>Leverage</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginLeft: 5,
            marginHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Leverage text={"1x"} onclick={handleLeverageChange} />
          <Leverage text={"3x"} onclick={handleLeverageChange} />
          <Leverage text={"5x"} onclick={handleLeverageChange} />
          <Leverage text={"10x"} onclick={handleLeverageChange} />
          <Leverage text={"20x"} onclick={handleLeverageChange} />
        </View>
      </View>
      <View>
        {leveragefield ? (
          <>
            <Text style={{ marginTop: 2, color: "red", marginLeft: 25 }}>
              Required *
            </Text>
          </>
        ) : null}
      </View>

      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <TextInput
          style={{
            marginTop: 10,
            width: iwidth,
            alignSelf: "center",
            backgroundColor: "grey",
            borderRadius: 8,
            padding: 10,
            //marginBottom: 10,
            borderColor: "white",
            borderWidth: 0.5,
          }}
          value={stoploss}
          onChangeText={(text) => {
            if (/^\d*\.?\d*$/.test(text) || text === "") {
              setstoploss(text);
            }
          }}
          placeholder="Stoploss"
          placeholderTextColor="white"
        />
      </View>
      <View>
        {stoplossfield ? (
          <>
            <Text style={{ color: "red", marginLeft: 20 }}>Required *</Text>
          </>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSaveData();
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {isModalVisible ? (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View className=" bg-white w-44 h-64 rounded-lg justify-items-center">
              <Image
                source={require("../assets/12375-green-tick.gif")}
                style={{ height: 120, width: 120, alignSelf: "center" }}
                resizeMode="cover"
              />
              <Text style={{ fontSize: 18, textAlign: "center" }}>
                Call Added Successfully!
              </Text>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4A5663",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    //fontWeight:'bold',
    marginBottom: 10,
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#E36139",
    borderRadius: 15,
    width: 200,
    alignSelf: "center",
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  button1: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF8C00",
    borderRadius: 25,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
