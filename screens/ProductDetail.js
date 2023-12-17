// import React from 'react';
// import { Box, Image, Heading, Text, HStack, Button, Divider, VStack } from "native-base";
// import { useNavigation } from "@react-navigation/native";
// import { Header } from "../components";


// const ProductDetail = ({ route }) => {
//   const { image, title, content, price, jenis, stok, id } = route.params.item;
//   const navigation = useNavigation();

//   const Checkout = () => {
//     // Pastikan properti 'id' ada sebelum menavigasi
//     if (route.params.item && route.params.item.id) {
//       navigation.navigate("Checkout", { item: route.params.item });
//     } else {
//       console.error('Error: Properti ID tidak valid pada objek produk');
//     }
//   };

//   return (
//     <>
//       <Header title={"Product Detail"} withBack={true} />
//       <Box p={2} shadow={3} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={590}>
//         <Image
//           source={{ uri: image }}
//           width={400}
//           height={200}
//           alt={title}
//           resizeMode="cover"
//         />
//         <Heading my={4} textAlign={"center"}>Informasi Produk</Heading>
//         <Divider bg={"black"} />
//         <VStack p={4}>
//           <HStack justifyContent="space-between" >
//             <Text fontSize={"16"}>Nama Produk: </Text>
//             <Text fontSize={"16"} bold>{title} </Text>
//           </HStack>
//           <HStack justifyContent="space-between" >
//             <Text fontSize={"16"}>Harga Produk: </Text>
//             <Text fontSize={"16"} bold>Rp. {price} /kg </Text>
//           </HStack>
//           <HStack justifyContent="space-between" >
//             <Text fontSize={"16"}>Jenis Produk: </Text>
//             <Text fontSize={"16"} bold>{jenis} </Text>
//           </HStack>
//           <HStack justifyContent="space-between" >
//             <Text fontSize={"16"}>Stok Produk: </Text>
//             <Text fontSize={"16"} bold>{stok} </Text>
//           </HStack>
//         </VStack>
//         <Text ml={6} mb={10} mt={10}>{content}</Text>
//       </Box>
//       <HStack bg={"white"} shadow={5} space={2} alignItems="center" position="absolute" bottom={0} left={0} w={400} h={90}>
//         <Button
//           bg="#38bdf8"
//           h={50}
//           ml={5}
//           w={350}
//           onPress={Checkout}
//         >
//           <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center">
//             <Box ml={2}>
//               <Heading fontSize={20} color="white">Beli Sekarang</Heading>
//             </Box>
//             <Box mr={2}>
//               <Heading fontSize={20} color="white">{price}</Heading>
//             </Box>
//           </Box>
//         </Button>
//       </HStack>
//     </>
//   );
// };

// export default ProductDetail;

import React, { useEffect } from 'react';
import { Box, Image, Heading, Text, HStack, Button, Divider, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = ({ route }) => {
  const { image, title, content, price, jenis, stok, id } = route.params.item;
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch existing cart data from AsyncStorage if it exists
    const fetchCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          // You can do something with the cart data if needed
          console.log('Existing Cart Data:', JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Error fetching cart data from AsyncStorage:', error);
      }
    };

    fetchCartData();
  }, []); // Run this effect only once when the component mounts

  const addToCartAndCheckout = async () => {
    try {
      // Fetch existing cart data from AsyncStorage
      const cartData = await AsyncStorage.getItem('cart');
      const existingCart = cartData ? JSON.parse(cartData) : [];

      // Add the current product to the cart
      const newItem = {
        id,
        title,
        price,
        image, // Make sure 'image' is a valid property of the product
        jenis,
        // ... (other properties you want to include)
      };

      const updatedCart = [...existingCart, newItem];

      // Save the updated cart data back to AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

      // Navigate to the Checkout page with the updated cart data
      navigation.navigate('Checkout', { cart: updatedCart });
    } catch (error) {
      console.error('Error updating cart and navigating to Checkout:', error);
    }
  };


  return (
    <>
      <Header title={'Product Detail'} withBack={true} />
      <Box p={2} shadow={3} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={590}>
        <Image
          source={{ uri: image }}
          width={400}
          height={200}
          alt={title}
          resizeMode="cover"
        />
        <Heading my={4} textAlign={"center"}>Informasi Produk</Heading>
        <Divider bg={"black"} />
        <VStack p={4}>
          <HStack justifyContent="space-between" >
            <Text fontSize={"16"}>Nama Produk: </Text>
            <Text fontSize={"16"} bold>{title} </Text>
          </HStack>
          <HStack justifyContent="space-between" >
            <Text fontSize={"16"}>Harga Produk: </Text>
            <Text fontSize={"16"} bold>Rp. {price} /kg </Text>
          </HStack>
          <HStack justifyContent="space-between" >
            <Text fontSize={"16"}>Jenis Produk: </Text>
            <Text fontSize={"16"} bold>{jenis} </Text>
          </HStack>
          <HStack justifyContent="space-between" >
            <Text fontSize={"16"}>Stok Produk: </Text>
            <Text fontSize={"16"} bold>{stok} </Text>
          </HStack>
        </VStack>
        <Text ml={6} mb={10} mt={10}>{content}</Text>
      </Box>
      <HStack bg={'white'} shadow={5} space={2} alignItems={'center'} position={'absolute'} bottom={0} left={0} w={400} h={90}>
        <Button bg="#38bdf8" h={50} ml={5} w={350} onPress={addToCartAndCheckout}>
          <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center">
            <Box ml={2}>
              <Heading fontSize={20} color="white">
                Beli Sekarang
              </Heading>
            </Box>
            <Box mr={2}>
              <Heading fontSize={20} color="white">
                {price}
              </Heading>
            </Box>
          </Box>
        </Button>
      </HStack>
    </>
  );
};

export default ProductDetail;

