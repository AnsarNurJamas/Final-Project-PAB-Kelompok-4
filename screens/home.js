import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { SliderBox } from "react-native-image-slider-box";
import { Box, ScrollView, Image, Text, Heading, VStack} from "native-base";


const imagesSlideshow1 = [
  require('../assets/iklan1.png'),
  require('../assets/iklan2.png'),
  require('../assets/mujair.png'),
];

const imagesSlideshow2 = [
  { image: require('../assets/ikanbandeng.jpg'), text: "Ikan Bandeng" },
  { image: require('../assets/ikanlele.jpg'), text: "Ikan Lele" },
  { image: require('../assets/ikanmujaer.jpg'), text: "Ikan Mujaer" },
];

const imagesSlideshow3 = [
  { image: require('../assets/budidaya1.jpeg'), text: "Berita Pertama" },
  { image: require('../assets/budidaya2.jpeg'), text: "Berita Kedua" },
  { image: require('../assets/budidaya3.jpeg'), text: "Berita Ketiga" },
];

const Home = () => {
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
      <Header title={"FISEESH"} />
      <ScrollView>
      <Box justifyContent="center" alignItems="center" my={5} mx={3}>
        <ScrollView horizontal pagingEnabled style={{ width: "100%" }}>
          <Box>
          <SliderBox
            images={imagesSlideshow1}
            autoplay
            circleLoop
          />
          </Box>
        </ScrollView>
      </Box>
      <Box mx={3}>
        <Heading>Product Unggulan FISEESH</Heading>
        <ScrollView horizontal style={{ marginTop: 10 }}>
            {imagesSlideshow2.map((item, index) => (
              <VStack key={index} p={2} shadow={3} borderRadius={10} mr={4}>
                <Image
                  source={item.image}
                  width={200}
                  height={100}
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
                  width={200}
                  height={100}
                  mb={2}
                  borderRadius={5}
                />
                <Text mx={2} bold>{item.text}</Text>
              </VStack>
            ))}
          </ScrollView>
      </Box>
      </ScrollView>
    </>
  );
};

export default Home;
