import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import Cards from "../Components/Cards";
import { useState, useEffect } from "react";
import axios from "axios";

const InfluenceProfile = ({ navigation, route }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [activeFocus, setActiveFocus] = useState(false);
  const [positiveFocus, setPositiveFocus] = useState(false);
  const [negativeFocus, setNegativeFocus] = useState(false);
  const [noActiveCalls, setNoActiveCalls] = useState(0);
  const [noTotalCalls, setNoTotalCalls] = useState(0);
  useEffect(() => {
    async function getData() {
      try {
        await axios
          .get(
            "https://fyp-node-backend-deploy-vercel.vercel.app/influencerprofile/A"
          )
          .then((res) => {
            setData1(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    async function getData1() {
      try {
        await axios
          .get(
            "https://fyp-node-backend-deploy-vercel.vercel.app/influencerprofile/P"
          )
          .then((res) => {
            setData2(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    async function getData2() {
      try {
        await axios
          .get(
            "https://fyp-node-backend-deploy-vercel.vercel.app/influencerprofile/N"
          )
          .then((res) => {
            setData3(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    const GetNumberOfCalls = async () => {
      await axios
        .get(
          `https://fyp-node-backend-deploy-vercel.vercel.app/getMetaData/${route.params.Name}`
        )
        .then((res) => {
          setNoTotalCalls(res.data["Total"]);
          setNoActiveCalls(res.data["Active"]);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
    getData1();
    getData2();
    GetNumberOfCalls();
  }, []);

  const [render, setisrender] = useState(false);
  // an object is declared which calls a different object from data file as per button clicked
  const [object, setobject] = useState([]);
  const activepressed = () => {
    setisrender(true);
    setobject(data1);
  };
  const positivepressed = () => {
    setisrender(true);
    setobject(data2);
  };
  const negativepressed = () => {
    setisrender(true);
    setobject(data3);
  };

  const TextHighlightOnFocus = (text, render) => {
    if (render) {
      return (
        <View className="bg-[#BFDBFF] rounded-md p-2">
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
            {text}
          </Text>
        </View>
      );
    } else {
      return (
        <>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
            {text}
          </Text>
        </>
      );
    }
  };
  return (
    <View className="flex-1 bg-[#2A333C]">
      <ImageBackground
        source={require("../assets/images/Background.jpg")}
        className="h-36 rounded-2xl opacity-95"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Influencers");
          }}
        >
          <Image
            source={require("../assets/images/left-arrow.png")}
            className="mt-8 mx-5 w-6 h-5"
          ></Image>
        </TouchableOpacity>
        <Text className="text-white text-2xl ml-4 mt-4 font-bold">
          {route.params.Name}
        </Text>
        <Text className="text-white text-xl ml-4"># 37</Text>
      </ImageBackground>
      <View className=" h-24 flex-row justify-between">
        <View className=" flex-1 justify-center items-center">
          <View className="bg-white p-1 rounded-md my-1">
            <Text>Total Calls</Text>
          </View>
          <Text className="text-white font-semibold text-lg">
            {noTotalCalls}
          </Text>
        </View>
        <Image
          source={require("../assets/images/telegramlogo.png")}
          className=" rounded-md w-20 h-20 shadow-2xl "
          resizeMode="cover"
        />
        <View className=" flex-1 justify-center items-center">
          <View className="bg-white p-1 rounded-md my-1">
            <Text>Active Calls</Text>
          </View>
          <Text className="text-white font-semibold text-lg">
            {noActiveCalls}
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-around items-center my-4">
        <TouchableOpacity
          onPress={() => {
            setActiveFocus(true);
            setPositiveFocus(false);
            setNegativeFocus(false);
            activepressed();
          }}
          style={{
            borderRadius: 10,
            padding: 8,
          }}
        >
          {TextHighlightOnFocus("Active", activeFocus)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveFocus(false);
            setPositiveFocus(true);
            setNegativeFocus(false);
            positivepressed();
          }}
          style={{
            borderRadius: 10,
            padding: 8,
          }}
        >
          {TextHighlightOnFocus("Positive", positiveFocus)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveFocus(false);
            setPositiveFocus(false);
            setNegativeFocus(true);
            negativepressed();
          }}
          style={{
            borderRadius: 10,
            padding: 8,
          }}
        >
          {TextHighlightOnFocus("Negative", negativeFocus)}
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 5 }}></View>
      {render ? (
        <Cards data={object} Name={route.params.Name} />
      ) : (
        <Cards data={data1} Name={route.params.Name} />
      )}
      <View />
    </View>
  );
};

export default InfluenceProfile;
