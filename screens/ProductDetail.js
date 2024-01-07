import React, { useState, useEffect } from 'react';
import { Box, Image, Heading, Text, HStack, Button, Divider, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import FIREBASE from '../config/FIREBASE';
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = ({ route }) => {
  const { product: initialProduct } = route.params;
  const { id: productId } = initialProduct;
  const [product, setProduct] = useState(initialProduct);
  const navigation = useNavigation();
  const { item } = route.params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = FIREBASE.database().ref('Product').child(productId);
        const productSnapshot = await productRef.once('value');

        if (productSnapshot.exists()) {
          const productData = productSnapshot.val();
          const storage = getStorage(FIREBASE.app());
          const imageRef = storageRef(storage, `images/${productData.gambar}.jpg`);

          try {
            const imageUrl = await getDownloadURL(imageRef);

            // Update state product dengan data yang diambil dari Firebase
            setProduct({
              id: productId,
              title: productData.namaproduct,
              content: productData.deskripsiproduct,
              price: productData.hargajual,
              jenis: productData.jenis,
              stok: productData.stok,
              image: imageUrl,
            });
          } catch (error) {
            // Handle ketika gambar tidak ditemukan
            console.warn('Image not found:', error);

            // Jika gambar tidak ditemukan, Anda dapat menetapkan placeholder atau nilai default ke image
            setProduct({
              id: productId,
              title: productData.namaproduct,
              content: productData.deskripsi,
              price: productData.hargajual,
              jenis: productData.jenis,
              stok: productData.stok,
              image: 'URL_PLACEHOLDER', // Gantilah dengan URL gambar placeholder atau default
            });
          }
        } else {
          console.warn('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);


  return (
    <>
      <Header title={'Product Detail'} withBack={true} />
      <Box mt={10} borderWidth={2} w={"50%"} alignSelf={"center"} borderRadius={10} h={140} >
        <Image
          source={{ uri: product.image }}
          width={"100%"}
          height={136}
          borderRadius={10}
          alt='Gambar Product'
        />
      </Box>
      <Heading my={4} textAlign={"center"}>{product.title}</Heading>
      <Box ml={4} mt={2} >
        <Heading>Detail:</Heading>
        <Text ml={1} mr={4} textAlign={'justify'} mt={1}>{product.content}</Text>
      </Box>
      <HStack justifyContent={"space-between"} mt={2}>
        <Box w={"40%"} h={10} bg={"white"} borderRadius={10} ml={4} borderWidth={2} borderColor={"#38bdf8"}>
          <Text bold fontSize={16} my={2} alignSelf={"center"}>Kategori: {product.jenis}</Text>
        </Box>
        <Box w={"20%"} h={10} bg={"white"} borderRadius={10} borderWidth={2} borderColor={"#38bdf8"}>
          <Text bold fontSize={16} my={2} alignSelf={"center"}>Stok: {product.stok}</Text>
        </Box>
        <Box w={"20%"} h={10} bg={"white"} borderRadius={10} mr={4} borderWidth={2} borderColor={"#38bdf8"}>
          <Text alignSelf={'center'} bold fontSize={16} my={2}>Rp {product.price}</Text>
        </Box>
      </HStack>

    </>
  );
};

export default ProductDetail;
