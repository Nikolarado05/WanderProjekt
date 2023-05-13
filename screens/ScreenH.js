import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ScreenH = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View>
      <Text>Screen H</Text>
    </View>
  );
};

export default ScreenH;
