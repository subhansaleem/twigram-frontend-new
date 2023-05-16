import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";

const ButtonCmp = ({ text, ws, NextScreen, navigation, Onclick }) => {
  const styles = getStyles(ws);
  ButtonCmp.propTypes = {
    ws: PropTypes.number.isRequired,
  };
  const handleClick = (NextScreen, navigation, Onclick) => {
    console.log(NextScreen, navigation, Onclick);
    if (Onclick === "None") {
      navigation.navigate(NextScreen);
    } else {
      Onclick();
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleClick(NextScreen, navigation, Onclick)}
      >
        <Text style={styles.editButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const getStyles = (buttonWidth) =>
  StyleSheet.create({
    editButton: {
      marginTop: 20,
      backgroundColor: "#E36139",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      alignSelf: "center",
      width: buttonWidth,
    },
    editButtonText: {
      color: "white",
      fontSize: 16,
      textAlign: "center",
    },
  });
export default ButtonCmp;
