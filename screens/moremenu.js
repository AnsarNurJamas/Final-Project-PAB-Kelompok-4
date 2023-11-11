import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Box, Text, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Header } from "../components";

const Moremenu = ({ navigation }) => {
  const menuItems = [
    { label: "Profile", screen: "Profile" },
    { label: "Artikel", screen: "Article" },
    { label: "FAQ", screen: "Faq" },
    { label: "History", screen: "History" },
  ];

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <>
      <Header title={"MENU"} />
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMenuItemPress(item.screen)}
          >
            <Box
              p={4}
              borderBottomWidth={1}
              borderBottomColor="gray.200"
            >
              <Text>{item.label}</Text>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};


export default Moremenu;
