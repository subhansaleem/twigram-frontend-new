import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

const Leverage = ({ text, onclick }) => {
  const [clicked, setClicked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#475577");

  const handleClick = () => {
    setClicked((prevClicked) => !prevClicked);
    onclick(text);

    if (!clicked) {
      setBackgroundColor("#E36139");
    } else {
      setBackgroundColor("#475577");
    }
  };

  return (
    <View
      className="w-8 h-8 rounded-md justify-center items-center bg-"
      style={{ backgroundColor: backgroundColor }}
    >
      <TouchableWithoutFeedback onPress={handleClick}>
        <Text className="p-2 text-white">{text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Leverage;
