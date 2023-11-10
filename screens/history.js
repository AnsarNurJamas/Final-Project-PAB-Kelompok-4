import { Header } from "../components";
import { Box, HStack, ScrollView, VStack, Text, Image, Heading, TouchableOpacity, Button, Center } from "native-base";
import datas from "../datas";

const History = ({ route, navigation }) => {
    const DetailHistory = () => {
        // Navigasi ke halaman lain (ganti "ProductDetail" dengan nama halaman tujuan Anda)
        navigation.navigate("DetailHistory");
      };
    return (
        <>
            <Header title={"Pembelian"} withBack="true" />
            <Box p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={230} >
                <VStack>
                    <HStack p={3} justifyContent="space-between">
                        <Text bold>Berhasil</Text>
                        <Text bold>10/10/2023</Text>
                    </HStack>
                    <HStack>
                        <Image
                            source={require("../assets/ikanlelee.png")}
                            width={50}

                            ml={5}
                            height={100}
                            alt="ikan"
                        />
                        <VStack>
                            <Heading ml={10}> Ikan Lele</Heading>
                            <Text mt={2} ml={10} bold> Jumlah x3</Text>
                            <Text mt={2} ml={10} bold> Rp 90.000</Text>
                        </VStack>
                    </HStack>
                    <Center>
                    <Button onPress={DetailHistory} backgroundColor={"#38bdf8"} h={10} w={80} mt={5}>
                        <Text bold color={"white"} fontSize={14}>Lihat Detail</Text>
                    </Button>
                    </Center>
                </VStack>
            </Box>
        </>
    );
};

export default History;