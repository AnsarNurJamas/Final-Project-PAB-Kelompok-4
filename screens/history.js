import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Box, HStack, ScrollView, VStack, Text, Image, Heading, Button, Center } from "native-base";
import FIREBASE from '../config/FIREBASE';

const History = ({ route, navigation }) => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        // Fetch purchase history data when the component mounts
        fetchPurchaseHistory();
    }, []);

    const fetchPurchaseHistory = async () => {
        try {
            // Assuming you have a 'transactions' node in your Firebase database
            const transactionsRef = FIREBASE.database().ref('transactions');
            const snapshot = await transactionsRef.once('value');

            if (snapshot.exists()) {
                const data = snapshot.val();
                const historyList = Object.keys(data).map((key) => {
                    const historyItem = data[key];
                    return { id: key, ...historyItem };
                });

                setPurchaseHistory(historyList);
            }
        } catch (error) {
            console.error('Error fetching purchase history:', error);
        }
    };

    const handleBuyAgain = () => {
        // Navigate to the checkout page with the product ID
        navigation.navigate('DetailHistory');
    };

    return (
        <>
            <Header title={"Pembelian"} withBack="true" />
            <ScrollView>
                {purchaseHistory.map((historyItem) => (
                    <Box key={historyItem.id} p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={210}>
                        <VStack>
                            <HStack mx={2} p={3} justifyContent="space-between">
                                <Text bold>Status: Berhasil</Text>
                                <Text bold>{historyItem.timestamp}</Text>
                            </HStack>
                            <HStack>
                                <Image
                                    source={{ uri: historyItem.product?.image || '' }}
                                    width={120}
                                    ml={5}
                                    height={120}
                                    alt="ikan"
                                />
                                <VStack mx={5} >
                                    <Heading>{historyItem.product?.title || ''}</Heading>
                                    <Text mt={2} bold>{`Jumlah x${historyItem.quantity}`}</Text>
                                    <Text mt={2} bold>{`Rp ${historyItem.totalPrice}`}</Text>
                                    <Text mt={2} bold>{`Pembayaran: ${historyItem.paymentMethod}`}</Text>
                                </VStack>
                            </HStack>
                            <Center>
                            </Center>
                        </VStack>
                    </Box>
                ))}
            </ScrollView>
            <HStack
                bg={"white"}
                shadow={5}
                space={2}
                alignItems="center"
                position="absolute"
                bottom={0}
                left={0}
                w={"100%"}
                h={90}
            >
                <Button
                    bg="#38bdf8"
                    h={50}
                    ml={5}
                    w={"90%"}
                    onPress={handleBuyAgain}
                >
                    <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center">
                        <Box ml={2}>
                            <Heading fontSize={20} color="white">Lanjut Belanja</Heading>
                        </Box>
                        <Box mr={2}>
                            <Heading fontSize={20} color="white"></Heading>
                        </Box>
                    </Box>
                </Button>
            </HStack>
        </>
    );
};

export default History;
