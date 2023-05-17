import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { useFonts } from "expo-font";
import InputButton from "../Components/InputButton";
import ButtonCmp from "../Components/ButtonCmp";
import axios from "axios";
import { ProfileContext } from "../Components/profilecontext";

const OTP = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [otp, setOtp] = useState([0, 0, 0, 0, 0, 0]);
  const [otperror, setotperror] = useState("");
  const { accessToken } = useContext(ProfileContext);

  const [loaded] = useFonts({
    Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleOtpChange = (text, index) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = text;
      return newOtp;
    });
  };

  const onClick = async () => {
    try {
      const otpString = otp.join("");
      const response = await axios.post(
        "https://fyp-node-backend-deploy-vercel.vercel.app/checkotp",
        {},
        {
          headers: {
            "x-access-token": accessToken,
            otp: otpString,
          },
        }
      );
      if (response.status === 200) {
        navigation.navigate("Home");
      } else {
        console.log("otp incorrect");
      }
    } catch (error) {
      setotperror(error.response?.data?.message || "An error occurred.");
    }
  };

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
          <View
            className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
            style={{ width: 56 }}
          >
            <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 0)}
              value={otp[0].toString()}
            ></TextInput>
          </View>
          <View
            className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
            style={{ width: 56 }}
          >
            <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 1)}
              value={otp[1].toString()}
            ></TextInput>
          </View>
          <View
            className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
            style={{ width: 56 }}
          >
            <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 2)}
              value={otp[2].toString()}
            ></TextInput>
          </View>
          <View
            className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
            style={{ width: 56 }}
          >
            <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 3)}
              value={otp[3].toString()}
            ></TextInput>
          </View>
          <View
            className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
            style={{ width: 56 }}
          >
            <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 4)}
              value={otp[4].toString()}
            ></TextInput>
          </View>
          <View
            className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
            style={{ width: 56 }}
          >
            <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 5)}
              value={otp[5].toString()}
            ></TextInput>
          </View>
          {/* <TextInput
              placeholder={"-"}
              className="text-white text-center font-lg"
              onChangeText={(text) => handleOtpChange(text, 6)}
              value={otp[6].toString()}
            ></TextInput> */}
          {/* <InputButton placehlder="-" w={56} ot/>
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} />
          <InputButton placehlder="-" w={56} /> */}
        </View>
        <View className="h-20"></View>
        <TouchableOpacity style={styles.loginButton} onPress={onClick}>
          <Text style={styles.loginButtonText}>Verify</Text>
        </TouchableOpacity>
        {otperror ? <Text style={styles.errorText}>{otperror}</Text> : null}
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

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
  },
  loginButton: {
    width: 250,
    height: 50,
    backgroundColor: "#E36139",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OTP;
