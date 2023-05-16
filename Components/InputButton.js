import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
const InputButton = ({ placehlder, w, text, setText }) => {
  const styles = getStyles(w);

  return (
    <View
      className="bg-[#6D7487] rounded-xl  h-14 justify-center mx-1"
      style={styles.editButton}
    >
      <TextInput
        placeholder={placehlder}
        className="text-white text-center font-lg"
        onChangeText={(i) => setText(i)}
        value={text}
      ></TextInput>
    </View>
  );
};
const getStyles = (buttonWidth) =>
  StyleSheet.create({
    editButton: {
      width: buttonWidth,
    },
  });

export default InputButton;
