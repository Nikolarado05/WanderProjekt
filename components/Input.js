import react from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderStartColor: error
              ? Colors.red
              : isFocused
              ? Colors.darkBlue
              : Colors.light,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 22, color: Colors.darkBlue, marginLeft: 10 }}
        />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(true);
          }}
          style={{ color: Colors.darkBlue, flex: 1 }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 22, color: Colors.darkBlue, marginRight: 10 }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && (
        <Text style={{ Color: Colors.red, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: Colors.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: Colors.light,
    flexDirection: "row",
    marginHorizontal: 1,
    borderWidth: 0.5,
    alignItems: "center",
  },
});

export default Input;
