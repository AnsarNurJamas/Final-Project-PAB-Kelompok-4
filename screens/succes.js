import React from "react";
import { Text, VStack, HStack, Box, Image, Divider, Button, Heading, ScrollView } from "native-base";
import { Header } from "../components";

const Success = ({ route, navigation }) => {
    // Extract necessary information from the route
    const { cart, productQuantities, grandTotal } = route.params;

    // Render purchased items
    const renderPurchasedItem = (item) => (
        <Box key={item.id} my={1} alignSelf={"center"} w={"100%"} h={"120"} bg={"white"} borderRadius={20} borderColor={"black"} borderWidth={2}>
            <HStack p={4}>
                {item?.image && (
                    <Image source={{ uri: item.image }} w={"30%"} h={"75"} alt='gambar produk' />
                )}
                <VStack mx={3}>
                    <Text bold fontSize={18}>{item?.title}</Text>
                    <Text>Rp. {item?.price} /kg</Text>
                    <Text>Jenis: {item?.jenis}</Text>
                    <Text>Jumlah: {productQuantities[item.id] || 1}</Text>
                </VStack>
            </HStack>
        </Box>

    );

    return (
        <>
            <Header title={"Berhasil"} withBack />
            <ScrollView>
                <VStack flex={1}>
                    <VStack flex={1}>
                        <Text textAlign="center" fontSize={20} fontWeight="bold" mt={5}>
                            Terima Kasih Atas Pembelian Anda :)
                        </Text>
                        <Divider my={3} alignSelf={"center"} bg={"black"} w={"90%"} />
                        <VStack flex={1} p={4}>
                            {cart.map(renderPurchasedItem)}
                        </VStack>
                    </VStack>
                </VStack>
                {/* <VStack p={4}>
                    <Text bold>Total Harga:</Text>
                    <Text>Rp. {grandTotal}</Text>
                </VStack> */}
            </ScrollView>
            <Button
                onPress={() => {
                    // Add any navigation logic you need
                    navigation.navigate('Home');
                }}
                bgColor={"#38bdf8"}
                my={2}
                w={"90%"}
                alignSelf={"center"}
                h={"7%"}
            >
                <Text bold fontSize={20} color={"white"}>Kembali</Text>
            </Button>
        </>
    );
};

export default Success;
