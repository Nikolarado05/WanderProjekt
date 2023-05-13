import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <ActivityIndicator style="large" color={Colors.black} />
          <Text style={{ marginRight: 10, fontSize: 16 }}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  loader: {
    height: 70,
    backgroundColor: Colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
export default Loader;
