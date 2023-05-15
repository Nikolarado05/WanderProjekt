import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import Login from "./screens/Login";
import { AsyncStorage } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import ScreenH from "./screens/ScreenH";
import Logout from "./screens/Logout";
import React from "react";
import Loader from "./components/Loader";

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="ItemScreen" component={ItemScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="ScreenH" component={ScreenH} />
          <Stack.Screen name="Logout" component={Logout} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
