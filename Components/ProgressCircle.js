import React from "react";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ProgressBar = ({ fill }) => {
  return (
    <View>
      <AnimatedCircularProgress
        size={40}
        width={5}
        fill={fill}
        tintColor="#25e06d"
        lineCap="round"
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#3d5875"
        duration={4000}
        rotation={0}
      >
        {(fill) => (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                padding: 2,
                fontWeight: 400,
              }}
            >
              {Math.round(fill)}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressBar;
