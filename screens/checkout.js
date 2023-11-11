import React, { useState } from "react";
import { Header } from "../components";
import { Heading,
     Center, 
     Text, 
     Box, 
     Image, 
     Button, 
     HStack, 
     VStack, 
     Spacer, 
     Divider, 
     Select } from "native-base";

const Checkout = ({ route, navigation }) => {
    const { image, title, content, price } = route.params.item;
    const [quantity, setQuantity] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('');

    const Succes = () => {
        // Navigasi ke halaman lain (ganti "ProductDetail" dengan nama halaman tujuan Anda)
        navigation.navigate("Succes" , { item: route.params.item });
      };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

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
                <Text mt={3} ml={5}>Jl Teuku Umar 3/10 </Text>
                <Text ml={5} mt={2}>Tambaksari, Pacarkembang</Text>
                <Text ml={5} mt={2}>Lamongan, Jawa Timur </Text>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <HStack justifyContent="space-between">
                    <Text ml={5} mt={3}>Jumlah x3</Text>
                    <Text mr={5} mt={3}>Rp 90.000</Text>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text ml={5} mt={2}>Ongkos Kirim</Text>
                    <Text mr={5} mt={2}>Rp 20.000</Text>
                </HStack>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <HStack justifyContent="space-between">
                    <Heading fontSize={20} ml={4} mt={5}> Total </Heading>
                    <Heading fontSize={20} mr={4} mt={5}> Rp 110.000 </Heading>
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
            <Box bg={"white"} shadow={5} space={2} alignItems="center" position="absolute" bottom={0} left={0} w={"100%"} h={90}>
                <Button
                    bg="#38bdf8"
                    mt={5}
                    h={50}
                    w={350}
                    onPress={Succes}
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
