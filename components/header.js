import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Box, HStack, Image, Heading } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ route, title, withBack = false, cart = [] }) => {
  const trueGray900 = "#38bdf8";
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Cart', { cart });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light" backgroundColor={trueGray900} />
      <Box bg={"#38bdf8"} p={"4"}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {!withBack ? (
              <>
                <Image
                  source={require("../assets/logo.png")}
                  w="12"
                  h="12"
                  alt="Fisheesh Logo"
                  mr={"3"}
                />
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <Box mr={"3"}>
                  <Ionicons name="arrow-back-outline" size={32} color="white" />
                </Box>
              </TouchableOpacity>
            )}
            <Heading color={"white"}>{title}</Heading>
          </HStack>
          <HStack position="absolute" right="4">
          <TouchableOpacity onPress={() => navigateToCart()}>
              <Ionicons name="cart" size={32} color="white" />
            </TouchableOpacity>
          </HStack>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default Header;
