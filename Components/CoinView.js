import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

const CoinView = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-[#4B5563] opacity-80 flex-row p-5 flex-1 items-center rounded-sm"
      onPress={() => onPress(data)}
    >
      <View className="w-24 flex-row ">
        <Text className="items-center justify-content-center text-white text-sm">
          {String(data.symbol).slice(0, -4)}
        </Text>
        
        <Text className="text-left text-white text-xs">/
          {String(data.symbol).slice(-4)}
        </Text>
      </View>
      <View className="w-20 ">
        <Text className="text-left text-m text-white">
          {parseFloat(data.weightedAvgPrice).toPrecision(5)}
        </Text>
      </View>
      <View className=" w-24 ">
        <Text className="text-left text-m text-white">
          {parseInt(data.volume)}
        </Text>
      </View>
      <View className="  flex-row items-center w-24">
        {parseFloat(data.priceChangePercent) > 0 ? (
          <Icon name="arrow-up" color="green"></Icon>
        ) : (
          <Icon name="arrow-down" color="red"></Icon>
        )}
        <Text className="mx-1 text-white">
          {Math.abs(parseFloat(data.priceChangePercent).toFixed(2))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoinView;