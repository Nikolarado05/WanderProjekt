import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import Input from "../components/Input";
import Button from "../components/Button";
import { Keyboard } from "react-native";
import Loader from "../components/Loader";
import { AsyncStorage } from "react-native";

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

    if (!inputs.email) {
      handleError("Bitte Email eingeben", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Bitte korrekte Email eingeben", "email");
      valid = false;
    }

    if (!inputs.fullname) {
      valid = false;

      handleError("Bitte Namen eingeben", "fullname");
    }

    if (!inputs.phone) {
      handleError("Bitte Telefonnummer eingeben", "phone");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Bitte Passwort eingeben", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError(
        "Bitte Passwort mit einer länge von min. 5 Zeich en eingeben",
        "password"
      );
      valid = false;
    }

    if (valid) {
      register();
      setTimeout(() => {
        setLoading(false);

        try {
          AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...inputs, loggedIn: false })
          );
          navigation.navigate("Registration");
        } catch (error) {
          Alert.alert("Fehler", "Etwas ist schiefgelaufen shiit");
        }
      }, 2000);
    }
  };

  const register = () => {
    setLoading(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
          Register
        </Text>
        <Text style={{ color: Colors.black, fontSize: 18, marginVertical: 10 }}>
          Enter your Details to Register
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
            iconName="account-outline"
            label="Fullname"
            placeholder="Namen bitte eingeben"
            error={errors.fullname}
            onFocus={() => {
              handleError(null, "fullname");
            }}
            onChangeText={(text) => handleOnChange(text, "fullname")}
          />
          <Input
            keyboardType="numeric"
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Telefonnummer bitte eingeben"
            error={errors.phone}
            onFocus={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => handleOnChange(text, "phone")}
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
          <Button title="Register" onPress={validate} />

          <Text
            onPress={() => navigation.navigate("Registration")}
            style={{
              color: Colors.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Hast du schon einen Account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Login;
