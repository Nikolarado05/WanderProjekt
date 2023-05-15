import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import {
  Attractions,
  Avatar,
  HeroImage,
  Hotels,
  Hotles,
  NotFound,
  Restaurants,
} from "../assets";
import { Image } from "react-native";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { ActivityIndicator } from "react-native";
import { getPlacesData } from "../api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Discover = (props) => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");
  const [isLoading, setisLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setbl_lat] = useState(null);
  const [bl_lng, setbl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  const { fields } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUserDetails(JSON.parse(userData));
      }
    })();
  }, []);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    setisLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setisLoading(false);
      }, 1000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>

          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            !userDetails
              ? navigation.navigate("Login")
              : userDetails.loggedIn
              ? navigation.navigate("Logout")
              : navigation.navigate("Registration")
          }
          className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg"
        >
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center bg-white mx-6 rounded-xl py-1 px-6 shadow-lg mt-6">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry.viewport);
            setbl_lat(details?.geometry?.viewport?.southwest?.lat);
            setbl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "AIzaSyAjl83wlTd6ud7tsgm66MedLLOH9q_dM6Y",
            language: "en",
          }}
        />
      </View>

      {/*Menu Container*/}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center justify-between px-5 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[22px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[18px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://icdn.sempremilan.com/wp-content/uploads/2020/02/Zlatan-Ibrahimovic-Toro.jpeg"
                      }
                      title={data.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[190px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className="w-10
                        h-10
                        object-cover"
                    />
                    <Text className="text-2xl text-[#2C7379] font-semibold">
                      Opps No Data found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
