import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { Heading, Center, Text, Box, Image, Button, HStack, VStack, Spacer, Divider, Select, ScrollView } from "native-base";
import { getData } from '../utils/localStorage';
import FIREBASE from '../config/FIREBASE';
import { Alert } from 'react-native';

const Checkout = ({ route, navigation }) => {
  // Extracting parameters from the route
  const { cart, productQuantities, grandTotal } = route.params;
  const [profile, setProfile] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');

  // KODE UNTUK MENYIMPAN CART KE ASYNCSTORAGE
  const saveCartToStorage = async (cartData) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  // KODE UNTUK MENYIMPAN JUMLAH PRODUCT YANG DI BELI KE ASYNCSTORAGE
  const saveProductQuantitiesToStorage = async (quantities) => {
    try {
      await AsyncStorage.setItem('productQuantities', JSON.stringify(quantities));
    } catch (error) {
      console.error('Error saving product quantities to AsyncStorage:', error);
    }
  };

  // KODE UNTUK MENDAPATKAN DATA USER
  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("isi data", data);
        setProfile(data);
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

  // CODE UNTUK MEMILIH METODE PEMBAYARAN
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

  const saveOrderToFirebase = async () => {
    try {
      const user = await getData("user");
      const orderData = {
        user: user,
        cart: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          jenis: item.jenis,
          quantity: productQuantities[item.id] || 1,
          totalPrice: item.price * (productQuantities[item.id] || 1),
        })),
        productQuantities: productQuantities,
        grandTotal: grandTotal,
        paymentMethod: selectedPayment,
        timestamp: new Date().toISOString(),
      };
      await FIREBASE.database().ref('Transactions').push(orderData);

      // Update stock in Firebase (adjust this based on your database structure)
      cart.forEach((item) => {
        FIREBASE.database().ref(`Product/${item.id}/stok`).transaction((currentStock) => {
          return currentStock - (productQuantities[item.id] || 1);
        });
      });

      // Clear the local cart and productQuantities data
      await saveCartToStorage([]);
      await saveProductQuantitiesToStorage({});
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleCheckout = () => {
    if (selectedPayment === '') {
      // Show an alert indicating that the user needs to select a payment method
      Alert.alert('Pilih Metode Pembayaran', 'Mohon memilih metode pembayaran terlebih dahulu ');
      return;
    }

    // Pass necessary information to Pembayaran screen
    navigation.navigate('Pembayaran', {
      cart,
      productQuantities,
      grandTotal,
      selectedPayment,
      profile,
    });
  };



  // UNTUK RENDER CART ITEM
  const renderCartItem = (item) => (
    <Box key={item.id} my={1} alignSelf={"center"} w={"100%"} h={"110"} bg={"white"} borderRadius={20} style={{
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    }}>
      <HStack p={4}>
        {item?.image && (
          <Image source={{ uri: item.image }} w={"30%"} h={"75"} borderRadius={10} alt='gambar produk' />
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
      <Header title={"Checkout"} withBack />
      <ScrollView>
        <VStack p={4}>
          {cart.map((item) => renderCartItem(item))}
        </VStack>
        <Heading ml={3} my={3}> INFORMASI LAINYA</Heading>
        <Divider alignSelf={"center"} bg={"black"} w={"90%"} />
        <VStack>
          {cart.map((item) => (
            <HStack key={item.id} mt={3} mx={5} justifyContent={"space-between"}>
              <Text>{item.title} x {productQuantities[item.id] || 1}</Text>
              <Text> Rp. {item.price * (productQuantities[item.id] || 1)}</Text>
            </HStack>
          ))}
        </VStack>
        <HStack mt={2} mx={5} justifyContent={"space-between"}>
          <Text>Nama:</Text>
          <Text>{profile?.name}</Text>
        </HStack>
        <HStack mt={2} mx={5} justifyContent={"space-between"}>
          <Text>No Telephone:</Text>
          <Text>{profile?.notelephone}</Text>
        </HStack>
        <HStack mt={2} mx={5} justifyContent={"space-between"}>
          <Text>Alamat:</Text>
          <Text>{profile?.adress}</Text>
        </HStack>
        <Select
          selectedValue={selectedPayment}
          w={"90%"}
          alignItems={"center"}
          mt={3}
          borderColor={"black"}
          onValueChange={handlePaymentChange}
          mb={120}
        >
          {paymentOptions.map((option, index) => (
            <Select.Item
              label={option.label}
              value={option.value}
              key={index}
            />
          ))}
        </Select>
      </ScrollView>
      {/* <HStack mt={5}  bgColor={"black"} shadow={20} h={50} mb={4} borderRadius={20} alignSelf={"center"} bg={"white"} w={"90%"} position={'absolute'}>
          <Box w={"60%"} borderRadius={20} h={50} bg={"white"} mb={4}>
            <Text  fontSize={15} ml={3} mt={4} bold>Total Harga: {grandTotal} </Text>
          </Box>
          <Button w={"40%"} borderRadius={20} h={50} bg={"#38bdf8"} mb={4}>
            <Heading color={"white"} my={2} alignSelf={"center"} onPress={handleCheckout} fontSize={15} bold>Bayar</Heading>
          </Button>
          
        </HStack> */}
      <HStack bg={'white'} shadow={5} space={2} position={'absolute'} bottom={0} left={0} w={400} h={90}>
        <Button bg="#38bdf8" h={50} ml={5} w={"80%"} alignSelf={"center"} onPress={handleCheckout}  >
          <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center" alignSelf={"center"}>
            <Box ml={2} alignSelf={"center"}>
              <Heading fontSize={20} color="white">
                BAYAR
              </Heading>
            </Box>
            <Box ml={2}>
              <Heading fontSize={20} color="white">
                Rp{grandTotal}
              </Heading>
            </Box>
          </Box>
        </Button>
      </HStack>
    </>
  );
};

export default Checkout;