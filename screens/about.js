import { Header } from "../components";
import React, { useState, useEffect } from "react";
import { View, Box, ScrollView, Image, Heading } from "native-base";
import { Text } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Separator from "../components/separator";

const imagesSlideshow1 = [
  require('../assets/budidaya1.jpeg'),
  require('../assets/budidaya2.jpeg'),
  require('../assets/budidaya3.jpeg'),
  // tambahkan gambar lainnya di sini
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesSlideshow1.length);
    }, 3000);


    return () => {
      clearInterval(slideshowInterval);
    };
  }, []);
  return (
    <>
      <Header title={"ABOUT"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading my={5} alignSelf={"center"}>TENTANG FISEESH</Heading>
        <Box w={"90%"} alignSelf={"center"} h={630} bg={"white"} shadow={2} mb={10}>
          <Box justifyContent="center" alignItems="center" mt={5} mx={3} bg={"transparent"} >
            <ScrollView borderRadius={"20"} horizontal pagingEnabled w={"95%"} h={250}>
              {imagesSlideshow1.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  alt={`Slide ${index}`}
                  width={290} // Sesuaikan ukuran gambar sesuai kebutuhan
                  height={250}
                />
              ))}
            </ScrollView>
          </Box>

          <View mx={3}>
            <Text style={{ marginTop: 30, fontSize: 25, fontWeight: "bold", marginLeft: 6 }}>Semangat Kami Untuk Kamu</Text>
            <Text style={{ textAlign: 'justify', marginTop: 5, marginLeft: 6, marginRight: 6 }}>Kami bangga menyediakan benih ikan bibit unggul dengan kualitas terbaik yang telah teruji, menjamin pertumbuhan ikan yang sehat dan optimal. Dengan layanan pelanggan yang ramah dan responsif, tim ahli kami siap membantu setiap langkah dari pembelian hingga pemeliharaan, memastikan Anda mendapatkan hasil terbaik dari kolam ikan Anda. Bergabunglah dengan kami dan rasakan kepuasan dalam membangun kolam ikan yang berkualitas tinggi dan produktif.</Text>
          </View>


          <Box shadow="5" bgColor={'white'} my={5} mx={5}>
            <View my={7} mx={3}>
              <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 17 }}>Kunjungi Kami</Text>
              <Text style={{ fontSize: 13, marginBottom: 5 }}>
                <Ionicons name="logo-instagram" size={13} /> @ekojaya</Text>

              <Text style={{ fontSize: 13, marginBottom: 5 }}>
                <Ionicons name="mail" size={13} /> ekojaya@gmail.com</Text>

              <Text style={{ fontSize: 13, marginBottom: 5 }}>
                <Ionicons name="phone-portrait-outline" size={13} /> 081231231123</Text>

            </View>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};




export default About;