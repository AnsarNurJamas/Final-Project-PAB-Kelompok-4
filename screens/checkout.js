import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { Heading, Center, Text, Box, Image, Button, HStack, VStack, Spacer, Divider, Select } from "native-base";
import { getData } from '../utils/localStorage';
import FIREBASE from '../config/FIREBASE';

const Checkout = ({ route, navigation }) => {
    const { image, title, content, price, stok, id } = route.params.item;
    const [quantity, setQuantity] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [profile, setProfile] = useState(null);
    const [totalPrice, setTotalPrice] = useState(price);
    const [Ongkir, setOngkir] = useState(15000);
    const [grandTotal, setGrandTotal] = useState(price * quantity + Ongkir);
    const [timestamp, setTimestamp] = useState('');


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

      const Succes = () => {
        // Navigasi ke halaman lain (ganti "Succes" dengan nama halaman tujuan Anda)
        navigation.navigate("Succes", {
            item: route.params.item,
            newTotalPrice: totalPrice,
            grandTotal: grandTotal,
            quantity: quantity,
            profile: profile,

        });
    };

      const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    
        // Harga baru dihitung dari harga awal * jumlah baru
        const newTotalPrice = price * newQuantity;
        setTotalPrice(newTotalPrice);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
    
            // Harga baru dihitung dari harga awal * jumlah baru
            const newTotalPrice = price * newQuantity;
            setTotalPrice(newTotalPrice);
        }
    };

    useEffect(() => {
        const newTotalPrice = price * quantity;
        setTotalPrice(newTotalPrice);
    
        const newGrandTotal = newTotalPrice + Ongkir;
        setGrandTotal(newGrandTotal);
    }, [quantity]);

    const handlePaymentChange = (value) => {
        setSelectedPayment(value);
    };

    const paymentOptions = [
        { label: 'Pilih Metode Pembayaran', value: '' },
        { label: 'Kartu Kredit', value: 'credit_card' },
        { label: 'Transfer Bank', value: 'bank_transfer' },
        { label: 'OVO', value: 'ovo' },
        { label: 'GoPay', value: 'gopay' },
    ];

    const handleCheckout = async () => {
        // Check if a payment method is selected
        if (!selectedPayment) {
          // Handle the case where no payment method is selected
          console.error('Error: Metode pembayaran belum dipilih');
          return;
        }

        const now = new Date();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta', // Set the time zone to WIB (Western Indonesia Time)
    };
    const timestampString = now.toLocaleString('id-ID', options);
      
        // Assuming you have a 'transactions' node in your Firebase database
        const transactionsRef = FIREBASE.database().ref('transactions');
      
        const { id, title, price, stok, image } = route.params.item;
      
        // Check if the product ID is defined
        if (!id) {
          console.error('Error: Properti ID tidak valid pada objek produk');
          return;
        }
      
        // Encode the product ID if it contains special characters
        const encodedProductId = encodeURIComponent(id);
      
        // Record the transaction details
        const transactionData = {
          product: {
            id: encodedProductId,
            title,
            price,
            image,
            // Add other product details as needed
          },
          quantity,
          totalPrice,
          paymentMethod: selectedPayment,
          timestamp: timestampString,
          name: profile.name,
          email: profile.email,
          notelephone: profile.notelephone,
          adress: profile.adress,
          // Add other transaction details as needed
        };
      
        try {
          // Push the transaction data to Firebase
          const newTransactionRef = await transactionsRef.push(transactionData);
      
          // Update the product stock in Firebase
          const productRef = FIREBASE.database().ref('Product').child(encodedProductId);
      
          // Check if the product reference is valid
          if (productRef) {
            // Check if the product stock is sufficient
            if (stok >= quantity) {
              await productRef.update({
                stok: stok - quantity,
              });
      
              // Navigate to the success page or perform other actions
              Succes();
            } else {
              console.error('Error: Stok produk tidak mencukupi');
            }
          } else {
            console.error('Error: Referensi produk tidak valid');
          }
        } catch (error) {
          console.error('Error during checkout:', error.message);
        }
      };
      
      
    
    return (
        <>
            <Header title={"Checkout"} withBack="true" />
            <Box p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={150}>
                <HStack>
                    <Image
                        source={{ uri: image }}
                        width={120}
                        mt={5}
                        ml={5}
                        height={100}
                        alt={title} // Deskripsi gambar (optional)
                        // Ukuran gambar (sesuaikan dengan kebutuhan)
                        resizeMode="cover" // Mode tata letak gambar (sesuaikan dengan kebutuhan)
                    />
                    <VStack>
                        <Heading ml={5} mt={5} fontSize={18}>{title}</Heading>
                        <Text bold ml={5}>{price}</Text>
                        <Text bold ml={5}>Jumlah</Text>
                        <HStack justifyContent="space-between" backgroundColor={"blue.100"} mt={1} ml={5} h={8} w={20} borderWidth={2} borderColor="blue" borderRadius={5}>
                            <Button
                                backgroundColor={"transparent"}
                                p={1}
                                h={8}
                                w={7}
                                onPress={handleDecrement}>
                                <Text paddingBottom={2} color={"black"}>-</Text>
                            </Button>
                            <Text
                                mt={1}
                                ml={2}
                                mr={2}
                                borderBottomLeftRadius={2}
                            >
                                {quantity}
                            </Text>
                            <Button backgroundColor={"transparent"}
                                p={1}
                                h={8}
                                w={7}
                                onPress={handleIncrement}>
                                <Text paddingBottom={2} color={"black"}>+</Text>
                            </Button>
                            <Spacer />
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
            <Box p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={1} mb={3} h={330}>
                <Heading ml={4} mt={5}> Pembelian </Heading>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <Text mt={3} ml={5}>{profile?.name}</Text>
                <Text ml={5} mt={2}>{profile?.notelephone}</Text>
                <Text ml={5} mt={2}>{profile?.adress}</Text>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <HStack justifyContent="space-between">
                    <Text ml={5} mt={3}>Harga</Text>
                    <Text mr={5} mt={3}>{totalPrice}</Text>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text ml={5} mt={2}>Ongkos Kirim</Text>
                    <Text mr={5} mt={2}>Rp 15.000</Text>
                </HStack>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <HStack justifyContent="space-between">
                    <Heading fontSize={20} ml={4} mt={5}> Total </Heading>
                    <Heading fontSize={20} mr={4} mt={5}> {grandTotal} </Heading>
                </HStack>
            </Box>
            <Box p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={1} mb={3} h={20}>
                <HStack justifyContent="space-between">
                    <Heading ml={5} mt={6} fontSize={20}>Pembayaran</Heading>
                    <Select
                        selectedValue={selectedPayment}
                        w={150}
                        mr={5}
                        mt={4}
                        onValueChange={handlePaymentChange}
                    >
                        {paymentOptions.map((option, index) => (
                            <Select.Item
                                label={option.label}
                                value={option.value}
                                key={index}
                            />
                        ))}
                    </Select>
                </HStack>
            </Box>
            <Box bg={"white"} shadow={5} space={2} alignItems="center" position="absolute" bottom={0} left={0} w={400} h={90}>
                <Button
                    bg="#38bdf8"
                    mt={5}
                    h={50}
                    w={350}
                    onPress={handleCheckout}
                >
                    <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center">
                        <Box ml={2}>
                            <Heading fontSize={20} color="white">Beli Sekarang</Heading>
                        </Box>
                    </Box>
                </Button>
            </Box>
            
        </>
    );

};

export default Checkout;