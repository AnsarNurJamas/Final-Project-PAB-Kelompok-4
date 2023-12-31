import React, { useState, useEffect } from "react";
import { Text, Heading, Box, VStack, HStack, Input, Button, Image, Icon, Toast } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header } from "../components";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FIREBASE from "../config/FIREBASE";
import { Alert } from "react-native";

const Pembayaran = ({ route, navigation }) => {
    const { cart, productQuantities, grandTotal, selectedPayment, saveCartToStorage } = route.params;
    const [image, setImage] = useState(null);
    const [BuktiPembayaran, setBuktiPembayaran] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isPaymentProofUploaded, setIsPaymentProofUploaded] = useState(false);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false, // Disable cropping
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const fileNameArray = result.assets[0].uri.split('/');
            setBuktiPembayaran(fileNameArray[fileNameArray.length - 1]);
        }

    };

    const uploadToFirebase = async () => {
        try {
            // logika validasi bukti pembayaran 
            if (!BuktiPembayaran) {
                Alert.alert("Peringatan", "Mohon unggah bukti pembayaran.");
                return;
            }
            const
                user = await AsyncStorage.getItem("user");
            const userData = JSON.parse(user);

            // fungsi membuat id unik untuk gambar 
            const imageId = Date.now().toString();

            const id = FIREBASE.database().ref('Transactions').push().key;

            // convert image ke blob
            const response = await fetch(image);
            const blob = await response.blob('image/*');

            // fungsi mendeklarasikan referensi storage
            const storageRef = FIREBASE.storage().ref();
            const imageRef = storageRef.child(`pembayaran/${imageId}`);

            // Unggah foto ke storage firebase
            await imageRef.put(blob);

            // Fungsi untuk download URL dari storage firebase
            const downloadURL = await imageRef.getDownloadURL();


            const orderData = {
                transactionId: id,
                user: userData,
                cart: cart.map((item) => ({
                    id: item.id,
                    image: item.image,
                    title: item.title,
                    price: item.price,
                    jenis: item.jenis,
                    quantity: productQuantities[item.id] || 1,
                    totalPrice: item.price * (productQuantities[item.id] || 1),
                })),
                productQuantities,
                grandTotal,
                paymentMethod: selectedPayment,
                BuktiPembayaran: downloadURL, // Use the download URL as BuktiPembayaran
                timestamp: new Date().toLocaleString('id-ID', {
                    timeZone: 'Asia/Jakarta',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }),
                status: 'Pending',
            };

            cart.forEach((item) => {
                FIREBASE.database().ref(`Product/${item.id}/stok`).transaction((currentStock) => {
                    return currentStock - (productQuantities[item.id] || 1);
                });
            });

            cart.forEach(async (item) => {
                const productRef = FIREBASE.database().ref(`Product/${item.id}`);
                await productRef.transaction((productData) => {
                    if (productData) {
                        // Update productTerjual field
                        productData.productTerjual = (productData.productTerjual || 0) + (productQuantities[item.id] || 1);
                    }
                    return productData;
                });
            });

            // Upload ke Realtime FIREBASE
            await FIREBASE.database().ref('Transactions').child(id).set(orderData);
            setIsPaymentProofUploaded(true);
        } catch (error) {
            console.error('Error during upload to Firebase:', error);
            setIsPaymentProofUploaded(false);
        }
    };

    const handleCheckout = () => {
        if (!BuktiPembayaran) {
            Alert.alert("Peringatan", "Mohon unggah bukti pembayaran.");
            return;
        }

        uploadToFirebase()
            .then(() => {
                // Pass necessary information to Success screen
                navigation.navigate('Succes');
            })
            .catch((error) => {
                console.error('Error during checkout:', error);
            });
    };


    return (
        <>
            <Header title={"Pembayaran"} withBack />
            <Heading my={5} textAlign={"center"}>TRANSAKSI</Heading>
            <Box alignSelf={"center"} borderRadius={10} h={100} w={"90%"} bg={"#38bdf8"} borderWidth={1} borderColor={"black"}>
                <VStack>
                    <HStack justifyContent={"space-between"} mx={2} mt={2}>
                        <Text bold color={"white"} fontSize={17}>Nomor Rekening BCA</Text>
                        <Text bold color={"white"} fontSize={17}>0640682485</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"} mx={2} mt={2}>
                        <Text bold color={"white"} fontSize={17}>OVO / DANA / GOPAY</Text>
                        <Text bold color={"white"} fontSize={17}>082136736166</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"} mx={2} mt={2}>
                        <Text bold color={"white"} fontSize={17}>Nama</Text>
                        <Text bold color={"white"} fontSize={17}>Ekky Dea Audry</Text>
                    </HStack>
                </VStack>
            </Box>
            <Box mt={5} alignSelf={"center"} w={"90%"} h={230} bg={"white"} borderWidth={1} borderRadius={10}>
                <VStack mt={1}>
                    <HStack justifyContent={"space-between"} mx={3} mt={3}>
                        <Box w={"30%"} bg={"#38bdf8"} borderRadius={10} h={9}>
                            <Text fontSize={20} color={"white"} mt={1} ml={-1} bold textAlign={"center"}> Total</Text>
                        </Box>
                        <Box borderWidth={1} borderRadius={10} borderColor={"#38bdf8"} w={"60%"} h={9}>
                            <Text fontSize={20} mt={1} ml={2}>Rp {grandTotal}</Text>
                        </Box>
                    </HStack>
                    <HStack justifyContent={"space-between"} mx={3} my={3}>
                        <Box w={"30%"} bg={"#38bdf8"} borderRadius={10} h={9}>
                            <Text fontSize={20} mt={1} ml={-1} color={"white"} bold textAlign={"center"}> Bukti</Text>
                        </Box>

                        <Input borderWidth={1} borderRadius={10} h={9} borderColor={"#38bdf8"} w={"60%"} value={BuktiPembayaran} isReadOnly={true} placeholder="Unggah Bukti Pembayaran"></Input>
                    </HStack>
                    <Button bg={"green.400"} alignSelf={"center"} w={"90%"} onPress={pickImage}>
                        <HStack>
                            <Ionicons bold name="cloud-upload" size={20} color={"white"} />
                            <Text ml={3} fontSize={18} bold color={"white"}>Unggah Bukti Pembayaran</Text>
                        </HStack>
                    </Button>
                    <Button mt={3} w={"90%"} alignSelf={"center"} bg={"#38bdf8"} borderRadius={5} onPress={handleCheckout}>
                        <Text fontSize={18} bold color={"white"}>Bayar</Text>
                    </Button>
                    {uploadStatus && (
                        <Text mt={2} alignSelf={"center"} color={uploadStatus.includes('Error') ? 'red.500' : 'green.500'}>
                            {uploadStatus}
                        </Text>
                    )}
                </VStack>
            </Box>
        </>
    )
};

export default Pembayaran
