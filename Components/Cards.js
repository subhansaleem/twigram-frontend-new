import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
// import { data } from "./data.js";
// import { data1 } from "./data.js";

const Cards = (props) => {
  function formatTimestamp(timestamp) {
    const currentTime = new Date().getTime() / 1000; // Get current time in seconds
    const diff = currentTime - timestamp; // Calculate the difference in seconds
  
    const days = Math.floor(diff / (24 * 60 * 60)); // Convert seconds to days
    const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60)); // Convert remaining seconds to hours
    const minutes = Math.floor((diff % (60 * 60)) / 60); // Convert remaining seconds to minutes
  
    return `${days}d ${hours}h ${minutes}m ago`;
  }
  
  const renderitem = ({ item, index }) =>
    props.Name == item.Name ? (
      <LinearGradient
        colors={["#2D3034", "#3E4042"]}
        className="rounded-md self-center my-1 mx-1 h-60"
        style={{width: '90%'}}
      >
        <View className="flex-row justify-around">
          <View className="flex-1 justify-center items-start ml-8">
            <View className="flex-row mt-4">
              <Text className="text-white font-extrabold text-lg">
                {item.Name}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-xl text-white font-bold">
                {item.Call.Coin}
              </Text>
              <Text className="text-xs text-white font-semibold mt-3">
                {item.Call.Conversion}
              </Text>
            </View>
            <View className="flex-row">
              <View className="bg-[#69C783] rounded-t-sm mt-1">
                <Text className="text-white font-semibold">
                  {item.Call.calltime}
                </Text>
              </View>
              <Text className="text-white font-semibold px-2 align-super mt-1">
                | {item.Call.Leverage}
              </Text>
            </View>
            <View>
            <Text className="text-white font-semibold mt-1">
    {formatTimestamp(item.Timestamp)}
  </Text>
            </View>
          </View>
          <View className="flex-1 justify-center item">
            <View className="justify-center bg-[#69C783] rounded-md my-3 w-24 h-20">
              <View className="bg-white justify-center rounded-md items-start mx-3 h-10">
                <>
                  <Text className="self-center font-semibold">
                    {item.Call.Type}
                  </Text>
                </>
              </View>
              <View>
                <Text className="self-center mt-2 font-semibold">$
                  {item.Call.buyvalue}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-1 mx-8">
  <View
    style={{
      borderBottomColor: "black",
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignSelf: "stretch",
      width: "100%",
      marginTop: 20, // Reduce the marginVertical value to decrease the vertical gap
    }}
  />
</View>
<View
  style={{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  }}
>
<View
  style={{
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: "rounded-md",
    //padding: "p-2",
    alignSelf: "flex-start",
    marginTop:-18,
    padding:5,
    borderRadius:5,

  }}
>
    <Image
      source={require("../assets/images/aim.png")}
      className="mt-1 w-3 h-3 mr-1"
      //resizeMode="cover"
    />
    <Text style={{fontSize:'500', fontSize:13}}>Targets </Text>
    <Text style={{fontSize:'500', fontSize:13}}>{item.Call.Targets.join(" - ")}</Text>
  </View>
  <View
  style={{
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: "rounded-md",
    //padding: "p-2",
    alignSelf: "flex-start",
    marginTop:-18,
    padding:5,
    borderRadius:5,

  }}
>
    <Image
      source={require("../assets/images/forbidden.png")}
      className="mt-1 w-3 h-3"
      //resizeMode="cover"
    />
    <Text style={{fontSize:'500', fontSize:13, marginLeft:3}}>Stop Loss</Text>
    <Text style={{fontSize:'500', fontSize:13, marginLeft:2}}>{item.Call.Stoploss}</Text>
  </View>
</View>


          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {item.Call.CompletedOn != null ||
            item.Call.CompletedOn != undefined ? (
              <View
  style={{
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: "rounded-md",
    //padding: "p-2",
    alignSelf: "flex-start",
    marginTop:-5,
    padding:5,
    borderRadius:5,

  }}
>
                 <Image
              source={require("../assets/images/medal.png")}
              className="mt-1 w-3 h-3"
              //resizeMode="cover"
            ></Image>
                <Text style={{fontSize:'500', fontSize:13}}>
                  call achieved
                </Text>
                <Text style={{fontSize:'500', fontSize:13, marginLeft:2}}>{item.Call.CompletedOn}</Text>
              </View>
            ) : (
              ""
            )}
            {item.Call.Accuracy != null || item.Call.Accuracy != undefined ? (
              <View className="bg-white mt-2 flex-row rounded-md p-2 self-start">
                <Text className="text-black font-semibold mx-1">Accuracy</Text>
                <Text className="text-black ">{item.Call.Accuracy}</Text>
              </View>
            ) : (
              ""
            )}
          </View>
        
      </LinearGradient>
    ) : (
      ""
    );

  return <FlatList data={props.data} renderItem={renderitem} />;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginTop: 30,
    //marginBottom:500,
  },
});

export default Cards;
