import { Header } from "../components";
import React, { useState } from "react";
import { View, Box, ScrollView } from "native-base";
import { Text } from "react-native"
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Separator from "../components/separator";
import MapView from 'react-native-maps';

const About = () => {
  const navigation = useNavigation(); //membuat navigation
  const [imagesArray, setImagesArray] = useState([
    require('../assets/budidaya1.jpeg'),
    require('../assets/budidaya2.jpeg'),
    require('../assets/budidaya3.jpeg'),
  ])
  return (
    <View bgColor={'white'} flex={1}>
      <Header title={"ABOUT"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View ml={3}>
          <Text style={{marginTop: 5, fontSize: 17, fontWeight: "bold" }}>Welcome to</Text>
          <Text style={{ marginTop:-5, color: "#38bdf8", fontSize: 30, fontWeight: "bold" }}>Fishees</Text>
        </View>

        <View>
          <SliderBox
            images={imagesArray}
            autoplay
            circleLoop
            onCurrentImagePressed={index => {navigation.navigate('Article')}}
            currentImageEmitter={index => { }}
          />
        </View>

        <View mx={3}>
          <Text style={{ marginTop: 30, fontSize: 25, fontWeight: "bold" }}>Semangat Kami Untuk Kamu</Text>
          <Text style={{ textAlign: 'justify', marginTop: 5 }}>Kami bangga menyediakan benih ikan bibit unggul dengan kualitas terbaik yang telah teruji, menjamin pertumbuhan ikan yang sehat dan optimal. Dengan layanan pelanggan yang ramah dan responsif, tim ahli kami siap membantu setiap langkah dari pembelian hingga pemeliharaan, memastikan Anda mendapatkan hasil terbaik dari kolam ikan Anda. Bergabunglah dengan kami dan rasakan kepuasan dalam membangun kolam ikan yang berkualitas tinggi dan produktif.</Text>
        </View>


        <Box shadow="5" bgColor={'white'} my={5} mx={3}>
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

        <View mx={1} my={3}>
          <MapView
            style={{
              width: '100%',
              height: 200,
            }}
            initialRegion={{
              latitude: -7.257472,
              longitude: 112.752090,
              latitudeDelta: 0.05,
              longitudeDelta: 0.04,
            }}
          />
        </View>
      </ScrollView>

    </View>
  );
};




export default About;