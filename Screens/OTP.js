import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { useFonts } from "expo-font";
import InputButton from "../Components/InputButton";
import ButtonCmp from "../Components/ButtonCmp";

const OTP = ({ navigation }) => {
  const [loaded] = useFonts({
    Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TailwindProvider>
      <View className="flex-1 items-center bg-black">
        <View className="h-1/4"></View>
        <Text className="font-extrabold text-4xl text-white">OTP</Text>
        <Text className="text-center text-xs text-white">
          Please Enter The 6-digit OTP Sent To Your Mobile Number.
        </Text>
        <View className="h-32"></View>
        <View className="flex-row">
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
        </View>
        <View className="h-20"></View>
        <ButtonCmp
          text="Verify"
          ws={250}
          navigation={navigation}
          NextScreen="Home"
        />
        <View className="flex-row">
          <Text className="text-white">Didn't receive an OTP?</Text>
          <TouchableOpacity>
            <Text className="text-white font-bold ml-1">Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  );
};
export default OTP;