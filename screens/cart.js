import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, HStack, Image, Text, Button, Divider, Heading, Spacer, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../components';
import FIREBASE from '../config/FIREBASE';
import Ionicons from '@expo/vector-icons/Ionicons';

const Cart = ({ route, navigation }) => {
  const { items } = route.params;
  const cartData = route.params?.cart || [];
  const [cart, setCart] = useState(cartData);
  const { image, title, content, price, stok, id } = route.params.item || {};
  const [quantity, setQuantity] = useState(1);
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedPayment, setSelectedPayment] = useState('');
  const [profile, setProfile] = useState(null);
  const [totalPrice, setTotalPrice] = useState(price);
  const [grandTotal, setGrandTotal] = useState(price * quantity);
  const [timestamp, setTimestamp] = useState('');

  // FUNGSI UNTUK INCREMENT / + 
  const handleIncrement = (productId) => {
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = (newQuantities[productId] || 0) + 1;
    setProductQuantities(newQuantities);

    // Update the total price and grand total
    updateTotalPrice(productId);
    updateGrandTotal();
  };

  // FUNGSI UNTUK DECREMENT / - 
  const handleDecrement = (productId) => {
    if (productQuantities[productId] > 1) {
      const newQuantities = { ...productQuantities };
      newQuantities[productId] -= 1;
      setProductQuantities(newQuantities);

      // Update the total price and grand total
      updateTotalPrice(productId);
      updateGrandTotal();
    }
  };


  const updateGrandTotal = () => {
    let total = 0;
    for (const productId in productQuantities) {
      const quantity = productQuantities[productId];
      const product = cart.find((item) => item.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    setGrandTotal(total);
  };

  const updateTotalPrice = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      const quantity = productQuantities[productId] || 1;
      const newTotalPrice = product.price * quantity;

      // Find the index of the product in the cart
      const productIndex = cart.findIndex((item) => item.id === productId);

      // Update the total price for the specific product in the cart
      const updatedCart = [...cart];
      updatedCart[productIndex] = {
        ...product,
        totalPrice: newTotalPrice, // Add a new property totalPrice
      };

      // Update the state
      setCart(updatedCart);

      // Save the updated cart to AsyncStorage
      saveCartToStorage(updatedCart);
    }
  };

  // FUNGSI UNTUK MENGAMBIL DATA USER DARI ASYNC STORAGE
  const getUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const userData = JSON.parse(userString);
        console.log("User data:", userData);
        setProfile(userData);
      } else {
        // Handle the case where user data is not found
        // navigation.replace('Login');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // FUNGSI UNTUK MENGAMBIL DATA PRODUCT YANG TERSIMPAN DI CART DARI ASYNCSTORAGE
  const saveCartToStorage = async (cartData) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const handleDelete = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    const newQuantities = { ...productQuantities };
    delete newQuantities[productId];
    setProductQuantities(newQuantities);

    // Save the updated cart to AsyncStorage
    saveCartToStorage(updatedCart);
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);


  const renderItem = (item) => (
    <Box key={item.id} my={1} alignSelf={"center"} w={"100%"} h={"150"} bg={"white"} borderRadius={20} borderColor={"black"} borderWidth={2}>
      <VStack p={4}>
        <HStack>
          {item?.image && (
            <Image source={{ uri: item.image }} style={{ width: 120, height: 110 }} alt='gambar produk' />
          )}
          <VStack mx={3}>
            <Text bold fontSize={18}>{item?.title}</Text>
            <Text my={1}>Rp. {item?.price} /kg</Text>
            <Text>Jenis: {item?.jenis}</Text>
            <HStack justifyContent="space-between" backgroundColor={"blue.100"} mt={1} h={8} w={"50%"} borderWidth={2} borderColor="blue" borderRadius={10}>
              <Button
                backgroundColor={"transparent"}
                p={1}
                h={8}
                w={5}
                onPress={() => handleDecrement(item.id)} >
                <Text paddingBottom={2} color={"black"}>-</Text>
              </Button>
              <Text
                mt={1}
                ml={2}
                mr={2}
                borderBottomLeftRadius={2}
              >
                {productQuantities[item.id] || 1}
              </Text>
              <Button backgroundColor={"transparent"}
                p={1}
                h={8}
                w={5}
                onPress={() => handleIncrement(item.id)}>
                <Text paddingBottom={2} color={"black"}>+</Text>
              </Button>
              <Button borderRadius={10} h={8} borderWidth={2} bg={"red.400"} ml={3} onPress={() => handleDelete(item.id)}>
                <Icon as={<Ionicons name="trash" />} size="4" color="white" />
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );

  const renderItemPrices = () => {
    return cart.map((item) => (
      <HStack key={item.id} mt={3} mx={5} justifyContent="space-between">
        <Text>{`Harga ${item.title} (${productQuantities[item.id] || 1}x)`}</Text>
        <Text>{`Rp. ${item.price * (productQuantities[item.id] || 1)}`}</Text>
      </HStack>
    ));
  };

  return (
    <>
      <Header title={"Keranjang"} withBack />
      <ScrollView>
        <VStack p={4}>
          {cart.map(renderItem)}
        </VStack>
      </ScrollView>
      <HStack shadow={20} h={"8%"} mb={4} borderRadius={20} alignSelf={"center"} bg={"white"} w={"90%"}>
        <Box w={"60%"} borderRadius={20} h={"100%"} bg={"white"} mb={4}>
          <Text fontSize={15} ml={2} my={4} bold>Total Harga:  {grandTotal} </Text>
        </Box>
        <Box w={"40%"} borderRadius={20} h={"100%"} bg={"#38bdf8"} mb={4}>
          <Heading fontSize={21} color={"white"} my={4} alignSelf={"center"} bold>Checkout</Heading>
        </Box>
      </HStack>
    </>
  );
}

export default Cart;
