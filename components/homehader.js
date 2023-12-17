import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { Box, HStack, Image, Heading, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getData } from '../utils/localStorage';
import FIREBASE from '../config/FIREBASE';

const HomeHeader = ({ title, withBack = false }) => {
    const [profile, setProfile] = useState(null);
    const getUserData = () => {
        getData("user").then((res) => {
            const data = res;
            if (data) {
                console.log("isi data", data);
                setProfile(data);
            } else {
                // navigation.replace('Login');
            }
        });
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getUserData();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    const trueGray900 = "#38bdf8";
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar barStyle="light" backgroundColor={trueGray900} />
            <Box bg={"#38bdf8"} paddingBottom={"4"}>
                <VStack mx={3}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Heading fontSize={"25"} bold color={"white"} mt={2} ml={2}>Hi {profile?.name} !</Heading>
                        <Image
                            source={require("../assets/logo.png")}
                            w="20%"
                            h="170%"
                            alt="Fisheesh Logo"
                            mt={"10"}
                            mr={"3"}
                        />
                    </HStack>
                    <Text fontSize={"17"} bold color={"white"} ml={2}>Ingin belanja apa hari ini?</Text>
                </VStack>
            </Box>
        </SafeAreaView>
    );
};

export default HomeHeader;