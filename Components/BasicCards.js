import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const BasicCards = ({ Title, SuccessRate, TotalCalls }) => {
  return (
    <TouchableOpacity>
      <View className="w-44 h-40 rounded-2xl bg-[#4B5563] mx-1 opacity-100 justify-center items-center blur-2xl">
        <Text className="text-white font-bold text-lg">{Title}</Text>
        <Text className="text-white">Success Rate</Text>
        <Text className="text-green-300 font-bold">{SuccessRate}</Text>
        <Text>Total Calls:{TotalCalls}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BasicCards;
