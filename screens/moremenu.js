import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Box, Text, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Header } from "../components";
import Profile from "./profile";
import Article from "../screens/article";
import Faq from "./faq";

const Stack = createNativeStackNavigator();

const Moremenu = ({ navigation }) => {
  const menuItems = [
    { label: "Profile", screen: "Profile" },
    { label: "Artikel", screen: "Article" },
    { label: "FAQ", screen: "Faq" },
    { label: "History", screen: "History" },
    // { label: "Artikel", screen: "Article" },
    // Tambahkan item menu lainnya di sini sesuai kebutuhan
  ];

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <NativeBaseProvider>
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
    </NativeBaseProvider>
  );
};

const App = () => {
  const [screen, setScreen] = useState("Moremenu");

  const handleNavigation = (screenName) => {
    setScreen(screenName);
  };

  return (
    <NativeBaseProvider>
      <Stack.Navigator initialRouteName={screen}>
        <Stack.Screen name="Moremenu" options={{ headerShown: false }}>
          {(props) => <Moremenu {...props} handleNavigation={handleNavigation} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Article" component={Article} options={{ headerShown: false }} />
        <Stack.Screen name="Faq" component={Faq} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
};

export default App;
