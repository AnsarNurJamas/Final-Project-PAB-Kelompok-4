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

  useEffect(() => {
    const loadCartAndCalculateTotal = async () => {
      await loadCartFromStorage();
      setGrandTotal(calculateInitialGrandTotal());
    };

    loadCartAndCalculateTotal();
  }, []);

  const calculateInitialGrandTotal = () => {
    let total = 0;
    for (const product of cart) {
      const quantity = productQuantities[product.id] || 1;
      total += product.totalPrice || product.price * quantity;
    }
    return total;
  };

  useEffect(() => {
    const initialGrandTotal = calculateInitialGrandTotal();
    setGrandTotal(initialGrandTotal);
  }, [cart, productQuantities]);


  const handleIncrement = async (productId) => {
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = (newQuantities[productId] || 0) + 1;
    setProductQuantities(newQuantities);

    // Update the total price and grand total
    updateTotalPrice(productId, newQuantities[productId]);
    updateGrandTotal();

    // Save the updated productQuantities to AsyncStorage
    await saveProductQuantitiesToStorage(newQuantities);
  };

  const handleDecrement = (productId) => {
    if (productQuantities[productId] > 1) {
      const newQuantities = { ...productQuantities };
      newQuantities[productId] -= 1;
      setProductQuantities(newQuantities);

      // Update the total price and grand total
      updateTotalPrice(productId, newQuantities[productId]);
      updateGrandTotal();
    }
  };

  const updateGrandTotal = () => {
    let total = 0;
    for (const product of cart) {
      const quantity = productQuantities[product.id] || 1;
      total += product.totalPrice || product.price * quantity;
    }
    setGrandTotal(total);
  };

  const updateTotalPriceAndQuantities = (productId, quantity) => {
    // Update the total price
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        totalPrice: updatedCart[productIndex].price * quantity,
      };
      setCart(updatedCart);
      saveCartToStorage(updatedCart);
    }
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = quantity;
    setProductQuantities(newQuantities);
    saveProductQuantitiesToStorage(newQuantities);
  };

  const saveProductQuantitiesToStorage = async (quantities) => {
    try {
      await AsyncStorage.setItem('productQuantities', JSON.stringify(quantities));
    } catch (error) {
      console.error('Error saving product quantities to AsyncStorage:', error);
    }
  };

  const loadProductQuantitiesFromStorage = async () => {
    try {
      const quantitiesData = await AsyncStorage.getItem('productQuantities');
      if (quantitiesData) {
        setProductQuantities(JSON.parse(quantitiesData));
      }
    } catch (error) {
      console.error('Error loading product quantities from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadProductQuantitiesFromStorage();
  }, []);

  const updateTotalPrice = (productId, quantity) => {
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        totalPrice: updatedCart[productIndex].price * quantity,
      };
      setCart(updatedCart);
      saveCartToStorage(updatedCart);
    }
  };

  useEffect(() => {
    const loadCartAndCalculateTotal = async () => {
      await loadCartFromStorage();
      await loadProductQuantitiesFromStorage(); // Load product quantities from AsyncStorage
      updateGrandTotal();
    };

    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
      loadCartAndCalculateTotal();
      loadProductQuantitiesFromStorage(); // Load product quantities on each navigation focus
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

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

  const handleDelete = async (productId) => {
    // Remove the product from the cart
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    // Remove the product quantity from the state
    const newQuantities = { ...productQuantities };
    delete newQuantities[productId];
    setProductQuantities(newQuantities);

    // Save the updated cart to AsyncStorage
    await saveCartToStorage(updatedCart);

    // Remove the product from AsyncStorage
    const storedCart = await AsyncStorage.getItem('cart');
    if (storedCart) {
      const storedCartData = JSON.parse(storedCart);
      const updatedStoredCart = storedCartData.filter((item) => item.id !== productId);
      await saveCartToStorage(updatedStoredCart);
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);


  useEffect(() => {
    const loadCartAndCalculateTotal = async () => {
      await loadCartFromStorage();
      updateGrandTotal();
    };

    loadCartAndCalculateTotal();
  }, []);

  const handleCheckout = () => {
    // Pass the required parameters to Checkout screen
    navigation.navigate('Checkout', {
      cart,
      productQuantities,
      grandTotal,
      // Other relevant data
    });
  };

  const renderItem = (item) => (
    <Box key={item.id} my={1} alignSelf={"center"} w={"100%"} h={"150"} bg={"white"} borderRadius={20} borderColor={"black"} borderWidth={2}>
      <VStack p={4}>
        <HStack>
          {item?.image && (
            <Image source={{ uri: item.image }} style={{ width: 120, height: 110 }} alt='gambar produk' borderRadius={10}/>
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

  return (
    <>
      <Header title={"Keranjang"} withBack />
      <ScrollView>
        <VStack p={4}>
        {cart.map((item) => renderItem(item))}
        </VStack>
      </ScrollView>
      <HStack shadow={20} h={"8%"} mb={4} borderRadius={20} alignSelf={"center"} bg={"white"} w={"90%"}>
        <Box w={"60%"} borderRadius={20} h={"100%"} bg={"white"} mb={4}>
          <Text fontSize={15} ml={2} my={4} bold>Total Harga: {grandTotal} </Text>
        </Box>
        <Button w={"40%"} borderRadius={20} h={"100%"} bg={"#38bdf8"} mb={4} onPress={handleCheckout}>
          <Heading color={"white"} my={2} alignSelf={"center"} bold>Checkout</Heading>
        </Button>
      </HStack>
    </>
  );
}

export default Cart;