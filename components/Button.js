import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Button = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: Colors.black,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
