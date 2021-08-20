import React from "react";
import { View, ActivityIndicator } from "react-native";
import sharedStyles from "../styles/SharedStyles";

interface props {}

const BigLoader: React.FC<props> = () => {
  return (
    <View
      style={{
        ...sharedStyles.centeredContainer,
        ...sharedStyles.fullHeightContainer,
      }}
    >
      <ActivityIndicator color="blue" size="large"></ActivityIndicator>
    </View>
  );
};

export default BigLoader;
