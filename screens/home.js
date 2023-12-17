import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { HomeHeader } from "../components";
import Svg, { Path } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Box, ScrollView, Image, Text, Heading, VStack, ZStack, Input, HStack, Icon } from "native-base";

const imagesSlideshow1 = [
  require('../assets/iklan1.png'),
  require('../assets/iklan5.png'),
  require('../assets/iklan6.png'),
  // tambahkan gambar lainnya di sini
];

const imagesSlideshow2 = [
  { image: require('../assets/ikanbandeng.jpg'), text: "Ikan Bandeng" },
  { image: require('../assets/ikanlele.jpg'), text: "Ikan Lele" },
  { image: require('../assets/ikanmujaer.jpg'), text: "Ikan Mujaer" },
  // tambahkan gambar produk lainnya di sini
];

const imagesSlideshow3 = [
  { image: require('../assets/budidaya1.jpeg'), text: "Berita Ikan Berjalan" },
  { image: require('../assets/budidaya2.jpeg'), text: "Berita Ikan Berjalan" },
  { image: require('../assets/budidaya3.jpeg'), text: "Berita Ikan Makan Tahu" },
  // tambahkan gambar produk lainnya di sini
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesSlideshow1.length);
    }, 3000); // Ganti gambar setiap 3 detik

    return () => {
      clearInterval(slideshowInterval);
    };
  }, []);

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
      <Box mx={3}>
        <HStack>
          <Input
            fontSize={16}
            borderRadius={10}
            borderColor={"#38bdf8"}
            my={3}
            h={9}
            w={"85%"}
            placeholder="Cari Product"
            InputLeftElement={<Icon ml="2" size="5" color="gray.400" as={<Ionicons name="ios-search" />} />}>
          </Input>
          <Box my={2} mx={2}>
            <Ionicons bold name="cart" size={40} color="#38bdf8" />
          </Box>
        </HStack>
      </Box>
      <ScrollView bg={"transparent"} zIndex={2}>
        <Box justifyContent="center" alignItems="center" my={5} mx={3} bg={"transparent"}>
          <ScrollView borderRadius={"20"} horizontal pagingEnabled w={"100%"} h={"30%"}>
            {imagesSlideshow1.map((image, index) => (
              <Image
                key={index}
                source={image}
                alt={`Slide ${index}`}
                width={400} // Sesuaikan ukuran gambar sesuai kebutuhan
                height={250}
              />
            ))}
          </ScrollView>
        </Box>
        <Box mx={4}>
          <Heading>Kategori</Heading>
          <HStack justifyContent={"space-between"} my={4}>
            <Box bg={"#38bdf8"} w={20} h={20} borderRadius={40}>
              <Image borderColor={"#38bdf8"}></Image>
            </Box>
            <Box bg={"#38bdf8"} w={20} h={20} borderRadius={40}>
              <Image borderColor={"#38bdf8"}></Image>
            </Box>
            <Box bg={"#38bdf8"} w={20} h={20} borderRadius={40}>
              <Image borderColor={"#38bdf8"}></Image>
            </Box>
          </HStack>
        </Box>
        <Box mx={4}>
          <Heading>Sering Terjual</Heading>
          <ScrollView horizontal>
          <HStack my={4}>
            <Box h={40} w={"20%"} bg={"black"}></Box>
            <Box h={40} w={"20%"} bg={"black"}></Box>
            <Box h={40} w={"20%"} bg={"black"}></Box>
          </HStack>
          </ScrollView>
        </Box>
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
                  mb={2}
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
