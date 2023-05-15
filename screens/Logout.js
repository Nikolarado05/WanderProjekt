import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import Input from "../components/Input";
import Button from "../components/Button";
import { Keyboard } from "react-native";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails;
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };
  const outlog = () => {
    AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...userDetails, loggedIn: false }),
    );
    navigation.navigate("Registration");

  };

  const backscreen = () => {
    navigation.navigate("Discover");
    };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Hallo{userDetails?.fullname}
      </Text>
      <Button title="Logout" onPress={outlog}></Button>

      <Button title="Discover Screen" onPress={backscreen}></Button>

    </View>
  );
};

export default Logout;
