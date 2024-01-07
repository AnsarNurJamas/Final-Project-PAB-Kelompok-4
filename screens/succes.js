import React from "react";
import { Text, VStack, HStack, Box, Image, Divider, Button, Heading, ScrollView } from "native-base";
import { Header } from "../components";

const Success = ({ route, navigation }) => {

    const Home = () =>{
        navigation.navigate('Home')
    }

    return (
        <VStack flex={1} justifyContent="space-between">
            <Header title={"Pembayaran"} withBack />
            <Image
                source={require("../assets/payment2.png")}
                w="70%"
                h="245"
                alt="Fisheesh Logo"
                alignSelf={"center"}
                mt={0}
            />
            <Heading color={"#38bdf8"}  bold alignSelf={"center"}>
                TRANSAKSI SEDANG DI PROSES
            </Heading>
            <Button mb={5} alignSelf={"center"} w={"90%"} h={10} bg={"#38bdf8"} borderRadius={20} shadow={10} onPress={Home}>
                <Text fontSize={20} mt={-1} textAlign={"center"} bold color={"white"}>Kembali</Text>
            </Button>
        </VStack>
    );

};

export default Success;
