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

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.password) {
      vaild = false;
      handleError("Bitte Passwort eingeben", "password");
    }

    if (valid) {
      Login();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const Login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...userData, loggedIn: true })
          );
          navigation.navigate("Logout");
        } else {
          Alert.alert("Error", "Daten nicht korrekt.");
        }
      } else {
        Alert.alert("Error", "Benutzer existiert nicht.");
      }
    }, 3000);
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Loader visible={loading} />
      <Loader />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
          Login
        </Text>
        <Text style={{ color: Colors.black, fontSize: 18, marginVertical: 10 }}>
          Enter your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            iconName="email-outline"
            label="Email"
            placeholder="Email bitte eingeben"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />

          <Input
            iconName="lock-outline"
            label="Password"
            placeholder="Passwort bitte eingeben"
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
            password
          />
          <Button title="Login" onPress={validate} />

          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: Colors.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Hast du keinen Account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Login;
