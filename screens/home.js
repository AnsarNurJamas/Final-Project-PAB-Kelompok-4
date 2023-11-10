import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { Box, ScrollView, Image, Text, Heading, VStack } from "native-base";

const imagesSlideshow1 = [
  require('../assets/iklan1.png'),
  require('../assets/iklan2.png'),
  require('../assets/budidaya3.jpeg'),
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
      <Header title={"FISEESH"} />
      <ScrollView>
      <Box justifyContent="center" alignItems="center" my={5} mx={3}>
        <ScrollView horizontal pagingEnabled style={{ width: "100%" }}>
          {imagesSlideshow1.map((image, index) => (
            <Image
              key={index}
              source={image}
              alt={`Slide ${index}`}
              width={400} // Sesuaikan ukuran gambar sesuai kebutuhan
              height={250} // Sesuaikan ukuran gambar sesuai kebutuhan
            />
          ))}
        </ScrollView>
      </Box>
      <Box mx={3}>
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
      {/* <Box mx={3}>
        <Heading>Flashsale</Heading>
      </Box> */}
      </ScrollView>
    </>
  );
};

export default Home;
