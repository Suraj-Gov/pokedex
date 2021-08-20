import React from "react";
import { Text, View } from "react-native";

interface props {
  labelTitle: string;
}

const WithLabel: React.FC<props> = ({ labelTitle, children }) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "200",
          marginBottom: -2,
        }}
      >
        {labelTitle}
      </Text>
      {children}
    </View>
  );
};

export default WithLabel;
