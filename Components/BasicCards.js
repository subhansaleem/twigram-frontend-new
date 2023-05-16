import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const BasicCards = (props) => {
  return (
    <TouchableOpacity>
      <View className="w-44 h-40 rounded-2xl bg-[#4B5563] mx-1 opacity-100 justify-center items-center blur-2xl">
        <Text className="text-white font-bold text-lg">Mohib Rehman</Text>
        <Text className="text-green-800">Success Rate</Text>
        <Text className="text-green-800 font-bold">90%</Text>
        <Text>Total Calls:112</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BasicCards;
