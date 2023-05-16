import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import ButtonCmp from "../Components/ButtonCmp";
import BasicCards from "../Components/BasicCards";
import BottomNavigation from "../Components/BottomNavigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";

const Home = ({ navigation }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showNav, setShowNav] = useState(true);

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollPosition = contentOffset.y;
    const contentHeight = contentSize.height;
    const scrollViewHeight = layoutMeasurement.height;
    const maxScroll = contentHeight - scrollViewHeight;
    const percentage = (scrollPosition / maxScroll) * 100;
    setScrollPercentage(percentage.toFixed(2)); // round to 2 decimal places
    if (scrollPercentage < 25) {
      setShowNav(false);
    } else if (scrollPercentage > 25) {
      setShowNav(true);
    }
  };

  const [coinDetails, setCoinDetails] = useState([]);
  let cd = [];
  useEffect(() => {
    const getData = async () => {
      axios
        .get("https://api.binance.com/api/v3/ticker/24hr")
        .then((res) => {
          setCoinDetails(
            res.data.filter((_, v, arr) => {
              if (String(arr[v]["symbol"]).slice(-4) === "BUSD") {
                return arr[v];
              }
            })
          );
        })
        .catch((e) => console.error(e));
    };
    getData();
    // setInterval(getData, 2000);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/Background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView onScroll={handleScroll}>
        <View className="h-14"></View>
        <View className="h-80 bg-[#4B5563] mx-5 rounded-lg opacity-100 "></View>
        <View className="flex-row justify-between my-2 p-4">
          <Text className="text-xl font-bold text-green-600 mx-6">
            Top Gainers
          </Text>
          <Text className="text-xl text-red-600 font-bold mr-12">
            Top Losers
          </Text>
        </View>
        <View className="flex-1 flex-row justify-between mx-3 ">
          <BlurView className="h-72 rounded-lg w-40" intensity={80}>
            <View className=" flex-row flex-1 mt-5">
              <View className="flex-1">
                <Text className="text-white font-bold text-xs ml-1">Coin</Text>
              </View>
              <View className="flex-1 ">
                <Text className="text-white font-bold text-xs ml-5">Value</Text>
              </View>
              <View className="flex-1 ">
                <Text
                  className="text-white
                 font-bold text-xs ml-4"
                >
                  Change
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 15,
              }}
            />
            {coinDetails
              .sort((a, b) => {
                if (
                  parseFloat(a.priceChangePercent) >
                  parseFloat(b.priceChangePercent)
                ) {
                  return -1;
                }
                if (
                  parseFloat(a.priceChangePercent) <
                  parseFloat(b.priceChangePercent)
                ) {
                  return 1;
                }
                return 0;
              })
              .slice(0, 5)
              .map((i) => {
                return (
                  <View key={i.symbol} className=" flex-row flex-1 ">
                    <View className="w-14">
                      <Text className="text-white font-bold text-xs ml-1">
                        {String(i.symbol).slice(0, -4)}
                      </Text>
                    </View>
                    <View className="w-12">
                      <Text className="text-white font-bold text-xs">
                        {parseFloat(i.weightedAvgPrice).toPrecision(2)}
                      </Text>
                    </View>

                    <View className="w-12">
                      {parseFloat(i.priceChangePercent) > 0 ? (
                        <View className="bg-green-500 p-1 rounded-md">
                          <Text className="text-white text-xs text-center ">
                            {parseFloat(i.priceChangePercent).toPrecision(2)}%
                          </Text>
                        </View>
                      ) : (
                        <View className="bg-red-500 p-1 rounded-md">
                          <Text className="text-white text-xs text-center">
                            {parseFloat(i.priceChangePercent).toPrecision(2)}%
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
          </BlurView>
          <BlurView className="h-72 rounded-lg w-40" intensity={80}>
            <View className="flex-row flex-1 ml-1 mt-5">
              <View className="flex-1">
                <Text className="text-white font-bold text-xs">Coin</Text>
              </View>
              <View className="flex-1 ">
                <Text className="text-white font-bold text-xs ml-5">Value</Text>
              </View>
              <View className="flex-1 ">
                <Text className="text-white font-bold text-xs ml-4">
                  Change
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 15,
              }}
            />
            {coinDetails
              .sort((a, b) => {
                if (
                  parseFloat(a.priceChangePercent) <
                  parseFloat(b.priceChangePercent)
                ) {
                  return -1;
                }
                if (
                  parseFloat(a.priceChangePercent) >
                  parseFloat(b.priceChangePercent)
                ) {
                  return 1;
                }
                return 0;
              })
              .slice(0, 5)
              .map((i) => {
                return (
                  <View key={i.symbol} className=" flex-row flex-1 ">
                    <View className="w-14 ml-1">
                      <Text className="text-white font-bold text-xs">
                        {String(i.symbol).slice(0, -4)}
                      </Text>
                    </View>
                    <View className="w-12">
                      <Text className="text-white font-bold text-xs">
                        {parseFloat(i.weightedAvgPrice).toPrecision(2)}
                      </Text>
                    </View>
                    <View className="w-12">
                      {parseFloat(i.priceChangePercent) > 0 ? (
                        <View className="bg-green-600 p-1 rounded-md">
                          <Text className="text-white font-bold text-xs text-center">
                            {parseFloat(i.priceChangePercent).toPrecision(2)}%
                          </Text>
                        </View>
                      ) : (
                        <View className="bg-red-600 p-1 rounded-md">
                          <Text className="text-white font-bold text-xs text-center">
                            {Math.abs(
                              parseFloat(i.priceChangePercent)
                            ).toPrecision(2)}
                            %
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
          </BlurView>
        </View>
        <View className="my-5">
          <View className="flex-row">
            <Image
              source={require("../assets/images/FlameIcon.png")}
              style={{ marginLeft: 7, width: 22, height: 25 }}
            />
            <Text
              className="text-lg ml-2 font-semibold text-white
        "
            >
              Hot Influencers
            </Text>
          </View>

          <Text className="text-white ml-2 mt-2">
            Have a look at our hot influencers this month
          </Text>
        </View>
        <ScrollView horizontal nestedScrollEnabled>
          <BasicCards />
          <BasicCards />
          <BasicCards />
        </ScrollView>
      </ScrollView>
      <BottomNavigation navigation={navigation} showNav={showNav} />
    </ImageBackground>
  );
};

export default Home;
