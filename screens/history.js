// History.js

import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Box, VStack, Text, Image, Heading, ScrollView, Pressable, HStack, Button } from "native-base";
import FIREBASE from '../config/FIREBASE';
import { getData } from "../utils/localStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const History = ({ navigation }) => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'Pending', title: 'Pending' },
        { key: 'Proses', title: 'Proses' },
        { key: 'Dikirim', title: 'Dikirim' },
        { key: 'Sukses', title: 'Sukses' },
        { key: 'Gagal', title: 'Gagal' },
    ]);


    useEffect(() => {
        // Fetch purchase history data when the component mounts
        const unsubscribe = fetchPurchaseHistory();

        // Cleanup the listener when the component unmounts
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    const fetchPurchaseHistory = async () => {
        try {
            const user = await getData("user");
            const userId = user?.uid;

            if (userId) {
                const transactionsRef = FIREBASE.database().ref('Transactions').orderByChild('user/uid').equalTo(userId);

                const handleSnapshot = (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const historyList = Object.keys(data).map((key) => {
                            const historyItem = data[key];
                            return { id: key, ...historyItem };
                        });

                        console.log('Purchase history fetched successfully:', historyList);
                        setPurchaseHistory(historyList);
                    } else {
                        console.log('No purchase history data found.');
                    }
                };

                // Listen for changes and update the state
                transactionsRef.on('value', handleSnapshot);

                // Return an unsubscribe function to stop listening when component unmounts
                return () => transactionsRef.off('value', handleSnapshot);
            }
        } catch (error) {
            console.error('Error fetching purchase history:', error);
        }
    };


    const handleTransactionPress = (transactionId) => {
        // Navigate to the detail screen with the transaction ID
        navigation.navigate('DetailHistory', { transactionId });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#FF0000'; // Red for Pending
            case 'Proses':
                return '#DJ291S'; // Yellow for Proses
            case 'Dikirim':
                return '#0000FF'; // Blue for Dikirim
            case 'Sukses':
                return '#4ADE80';
            case 'Gagal':
                return '#FF0000'; // Green for Sukses
            default:
                return '#000000'; // Default color (black) for unknown status
        }
    };

    const renderScene = SceneMap({

        Pending: () => renderTabContent('Pending'),
        Proses: () => renderTabContent('Proses'),
        Dikirim: () => renderTabContent('Dikirim'),
        Sukses: () => renderTabContent('Sukses'),
        Gagal: () => renderTabContent('Gagal'),
    });


    const renderTabContent = (status) => {
        const filteredHistory = purchaseHistory.filter((item) => item.status === status);

        const handlePesananDiterima = async (transactionId) => {
            try {
                // Update the status to "Sukses" in Firebase
                await FIREBASE.database().ref(`Transactions/${transactionId}/status`).set('Sukses');
            } catch (error) {
                console.error('Error updating status:', error);
            }
        };

        return (
            <ScrollView>
                {filteredHistory.map((historyItem) => (
                    <Pressable
                        key={historyItem.id}
                        onPress={() => handleTransactionPress(historyItem.id)}
                    >
                        <Box p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={140} bg={"white"}>
                            <HStack ml={3} my={1}>
                                <Image
                                    source={require("../assets/logo.png")}
                                    w="100"
                                    h="110"
                                    alt="Fisheesh Logo"
                                    mr={"3"}

                                />
                                <VStack my={1}>
                                    <HStack>
                                        <Heading fontSize={20} color={getStatusColor(historyItem.status)}>{historyItem.status}</Heading>
                                    </HStack>
                                    <Text>{`Total Produk: ${historyItem.cart.length}`}</Text>
                                    <Text>{`Total Harga: ${historyItem.grandTotal || ''}`}</Text>
                                    <Text>Waktu: {historyItem.timestamp}</Text>
                                    {historyItem.status === 'Pending' && (
                                        <Button
                                            onPress={() => { }}
                                            isDisabled={true}  // Button is disabled in 'Proses' status
                                            bg={"#38bdf8"}
                                        >
                                            <Text bold color="white">Pesanan Diterima</Text>
                                        </Button>
                                    )}
                                    {historyItem.status === 'Dikirim' && (
                                        <Button
                                            onPress={() => handlePesananDiterima(historyItem.id)}
                                            isDisabled={false}  // Set to true or false based on your condition
                                            bg={"#38bdf8"}
                                        >
                                            <Text bold color="white">Pesanan Diterima</Text>
                                        </Button>
                                    )}

                                    {historyItem.status === 'Proses' && (
                                        <Button
                                            onPress={() => { }}
                                            isDisabled={true}  // Button is disabled in 'Proses' status
                                            bg={"#38bdf8"}
                                        >
                                            <Text bold color="white">Pesanan Diterima</Text>
                                        </Button>
                                    )}
                                    {historyItem.status === 'Sukses' && (
                                        <Button
                                            onPress={() => { }}
                                            isDisabled={true}  // Button is disabled in 'Proses' status
                                            bg={"#38bdf8"}
                                        >
                                            <Text bold color="white">Pesanan Diterima</Text>
                                        </Button>
                                    )}
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>
                ))}
            </ScrollView>
        );
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#38bdf8' }}
            style={{ backgroundColor: '#1197FD' }}
            activeColor={'white'}
            inactiveColor={'white'}
            labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
        />
    );

    return (
        <>
            <Header title={"Riwayat"} withBack={true} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: '100%' }}
            />
        </>
    );
};

export default History;