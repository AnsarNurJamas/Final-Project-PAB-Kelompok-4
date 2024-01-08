import React, { useState, useEffect, useCallback } from "react";
import { HomeHeader } from "../components";
import Svg, { Path } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Box, ScrollView, Image, Text, Heading, VStack, ZStack, Input, HStack, Icon, Button, View, TouchableOpacity } from "native-base";
import FIREBASE from "../config/FIREBASE";
import { Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { articles } from "../datas";


const imagesSlideshow1 = [
  require('../assets/iklan1.png'),
  require('../assets/iklan5.png'),
  require('../assets/iklan6.png'),
  // tambahkan gambar lainnya di sini
];


const Home = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');


  const handleCategoryPress = useCallback(
    (category) => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Product', params: { category, tabIndex: getCategoryTabIndex(category) } }],
      });
    },
    [navigation]
  );

  useEffect(() => {
    fetchMostSoldProducts();
  }, []);

  const fetchMostSoldProducts = async () => {
    try {
      const productsRef = FIREBASE.database().ref('Product');
      const storage = getStorage(FIREBASE.app());

      const snapshot = await productsRef.orderByChild('productTerjual').limitToLast(3).once('value');

      if (snapshot.exists()) {
        const data = snapshot.val();
        const productList = await Promise.all(Object.keys(data).map(async (key) => {
          const product = data[key];
          const imageRef = storageRef(storage, `images/${product.gambar}.jpg`);
          const imageUrl = await getDownloadURL(imageRef);
          return {
            ...product,
            imageUrl,
          };
        }));
        setMostSoldProducts(productList); // Make sure this line is correct
      }
    } catch (error) {
      console.error('Error fetching most sold products:', error);
    }
  };

  const fetchLatestArticles = () => {
    // Sorting articles based on date in descending order
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Take the first 3 articles
    const latestArticles = sortedArticles.slice(0, 3);
    return latestArticles;
  };

  const latestArticles = fetchLatestArticles();



  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesSlideshow1.length);
    }, 3000);


    return () => {
      clearInterval(slideshowInterval);
    };
  }, []);
  const getCategoryTabIndex = (category) => {
    switch (category) {
      case 'Benih Ikan':
        return 0;
      case 'Ikan':
        return 1;
      case 'Udang':
        return 2;
      case 'Semua Produk':
        return 3;
      default:
        return 0;
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = "62881026052282";
    const whatsappURI = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappURI);
  };

  const openProductDetail = (product) => {
    // Check if the product is defined before accessing its properties
    if (product) {
      // Navigate to the 'ProductDetail' screen and pass the product data as params
      navigation.navigate('ProductDetail', { product });
    }
  };

  const handleSearch = () => {
    // Navigate to the 'Product' screen with the search query and tabIndex as parameters
    navigation.navigate('Product', { searchText: searchQuery});
  };


  return (
    <>
      <HomeHeader title={"FISEESH"} />
      <Image
        source={require("../assets/topbar.png")}
        size="xl"
        alt="Fisheesh Logo"
        w={"100%"}
        h={20}
        bg={"transparent"}
      />
      
      {/* Slideshow / carousel */}
      <ScrollView bg={"transparent"}>
        <Box justifyContent="center" alignItems="center" my={5} mx={3} bg={"transparent"}>
          <ScrollView borderRadius={"20"} horizontal pagingEnabled w={"100%"} h={"20%"}>
            {imagesSlideshow1.map((image, index) => (
              <Image
                key={index}
                source={image}
                alt={`Slide ${index}`}
                width={340} // Sesuaikan ukuran gambar sesuai kebutuhan
                height={250}
                
               
              />
            ))}
          </ScrollView>
        </Box>
        {/* Tampilan shortcut  */}
        <Box mx={4}>
          <Heading>Kategori</Heading>
          <HStack justifyContent={"space-between"} my={4}>
            <VStack>
              <Button bg={"white"} borderWidth={2} borderColor={"#FFC158"} w={20} h={20} borderRadius={50} onPress={() => handleCategoryPress('Benih Ikan')} >
                <Image source={require("../assets/benih.png")}
                alt="gambar"
                ></Image>
              </Button>
              <Text mt={2} fontSize={15} bold alignSelf={"center"}>BENIH IKAN</Text>
            </VStack>
            <VStack>
              <Button bg={"white"} borderWidth={2} borderColor={"#FFC158"} w={20} h={20} borderRadius={50} onPress={() => handleCategoryPress('Ikan')}>
                <Image source={require("../assets/kecil.png")}
                alt="gambar"
                ></Image>
              </Button>
              <Text mt={2} fontSize={15} bold alignSelf={"center"}>IKAN</Text>
            </VStack>
            <VStack>
              <Button bg={"white"} borderWidth={2} borderColor={"#FFC158"} w={20} h={20} borderRadius={50} onPress={() => handleCategoryPress('Udang')}>
                <Image source={require("../assets/udang.png")}
                alt="gambar"
                ></Image>
              </Button>
              <Text mt={2} fontSize={15} bold alignSelf={"center"}>UDANG</Text>
            </VStack>
          </HStack>
        </Box>
        {/* Slideshow card Rekomendasi Product */}
        <Box mx={4}>
          <Heading>Sering Terjual</Heading>
          <ScrollView horizontal>
            <HStack my={4} ml={-2}>
              {mostSoldProducts.map((product, index) => (
                <Box key={index} bg={"white"} borderRadius={15} borderWidth={2} h={250} w={40} mx={2}>
                  <Image
                    source={{ uri: product.imageUrl }} // Assuming 'gambar' is the field containing the image URL
                    alignSelf={"center"}
                    w={"90%"}
                    h={140}
                    borderWidth={2}
                    borderColor={"black"}
                    borderRadius={15}
                    mt={2}
                    alt="gambar"
                  />
                  <Heading mx={3} fontSize={15} mt={2}>{product.namaproduct}</Heading>
                  <Text mx={3} my={1}>{`Rp ${product.hargajual || 0}`}</Text>
                  <Button
                    mt={1}
                    borderRadius={15}
                    w={"90%"}
                    alignSelf={"center"}
                    bg={"#38bdf8"}
                    onPress={() => openProductDetail(product)}
                  >
                    <Text color={"white"} bold fontSize={15}>
                      Lihat
                    </Text>
                  </Button>
                </Box>
              ))}
            </HStack>
          </ScrollView>
        </Box>
        {/* Slideshow card Artikel */}
        <Box mx={4}>
          <Heading>Artikel</Heading>
          <ScrollView horizontal>
            <HStack my={4} mx={1} ml={-2}>
              {latestArticles.map((article, index) => (
                <Box key={index} bg={"white"} borderRadius={15} borderWidth={2} h={300} w={40} mx={2}>
                  <Image
                    source={{ uri: article.image }}
                    alignSelf={"center"}
                    w={"90%"}
                    h={140}
                    borderWidth={2}
                    borderColor={"black"}
                    borderRadius={15}
                    mt={2}
                    alt="gambar"
                  />
                  <Heading textAlign={"justify"} fontSize={15} mt={2} mx={4}>{article.title}</Heading>
                  <Text mx={3} my={1}>{article.date}</Text>
                  <Button
                    mt={1}
                    borderRadius={15}
                    w={"90%"}
                    alignSelf={"center"}
                    bg={"#38bdf8"}
                    onPress={() => {
                      // Navigate to the 'ArticleDetail' screen and pass the article data as params
                      navigation.navigate('DetailArtikel', { itemDikirim: article });
                    }}
                  >
                    <Text color={"white"} bold fontSize={15}>
                      Lihat
                    </Text>
                  </Button>
                </Box>
              ))}
            </HStack>
          </ScrollView>
        </Box>
        {/* Menghubungi admin */}
        <Button w={"90%"} h={"60px"} bg={"white"} alignSelf={"center"} borderRadius={30} borderWidth={2} mt={2} onPress={openWhatsApp}>
          <HStack>
            <Box ml={-3} mt={-1}>
              <Ionicons bold name="logo-whatsapp" size={37} color={"#4ade80"} />
            </Box>
            <Box >
              <Text ml={3} bold mt={1} fontSize={17}>Klik disini untuk menghubungi admin</Text>
            </Box>
          </HStack>
        </Button>
        {/* <Box mx={3}>
          <Heading>Product Unggulan FISEESH</Heading>
          <ScrollView horizontal style={{ marginTop: 10 }}>
            {imagesSlideshow2.map((item, index) => (
              <VStack key={index} p={2} shadow={3} borderRadius={10} mr={4}>
                <Image
                  source={item.image}
                  alt={`Product ${index}`}
                  width={200} // Sesuaikan ukuran gambar sesuai kebutuhan
                  height={100} // Sesuaikan ukuran gambar sesuai kebutuhan
                  mb={2}a
                  borderRadius={5}
                />
                <Text mx={2} bold>{item.text}</Text>
              </VStack>
            ))}
          </ScrollView>
        </Box>
        <Box mx={3} my={5}>
          <Heading>Informasi Terbaru</Heading>
          <ScrollView horizontal style={{ marginTop: 10 }}>
            {imagesSlideshow3.map((item, index) => (
              <VStack key={index} p={2} shadow={3} borderRadius={10} mr={4}>
                <Image
                  source={item.image}
                  alt={`Product ${index}`}
                  width={200} // Sesuaikan ukuran gambar sesuai kebutuhan
                  height={100} // Sesuaikan ukuran gambar sesuai kebutuhan
                  mb={2}
                  borderRadius={5}
                />
                <Text mx={2} bold>{item.text}</Text>
              </VStack>
            ))}
          </ScrollView>
        </Box>
        <Box mx={3}>
          <Heading>Flashsale</Heading>
        </Box> */}
      </ScrollView>
    </>
  );
};

export default Home;
