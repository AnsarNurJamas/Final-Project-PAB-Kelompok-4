import React, { useState, useEffect } from 'react';
import { Header } from "../components";
import { Box, Center, Icon, ScrollView, Text, VStack, Stack, Button, HStack, Heading, Divider, Input } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getData } from '../utils/localStorage';
const Profile = ({ navigation }) => {
  // Add state variables using useState
  const [profile, setProfile] = useState(null);

  //MENGAMBIL DATA USER DARI ASYNC STORAGE DAN ASYNC STORAGE MENDAPAT DARI FIREBASE
  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("isi data", data);
        setProfile(data);
      } else {
        // navigation.replace('Login');
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // BATAS  KODE UNTUK MENGAMBIL DATA USER DARI ASYNC STORAGE

  // KODE UNTUK MEMNGATUR NAVIGASI KETIKA TOMBOL EDIT PROFILE DI PENCET AKAN DI ARAHKAN KE HALAMAN EDIT PROFILE
  const EditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <>
      <Header title={"PROFILE"} withBack="True" />
      <Box p={12} alignItems="center">
        <Icon as={Ionicons} name="person-circle-outline" size={200} color="black" />
        <Heading>PROFILE DETAIL</Heading>
      </Box>
      <Divider w={370} alignSelf="center" justifyContent="center" />
      <VStack>
        <HStack mr={5} ml={5} mt={7} justifyContent="space-between">
          <Text bold>Nama</Text>
          <Text>{profile?.name}</Text>
        </HStack>
        <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
          <Text bold>Email</Text>
          <Text>{profile?.email}</Text>
        </HStack>
        <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
          <Text bold>No Telepon</Text>
          <Text>{profile?.notelephone}</Text>
        </HStack>
        <HStack mr={5} ml={5} mt={5} mb={3} justifyContent="space-between">
          <Text bold>Alamat</Text>
          <Text>{profile?.adress}</Text>
        </HStack>
      </VStack>
      <VStack alignSelf="center" justifyContent="center">
        <Button onPress={EditProfile} bg={"#38bdf8"} mt={5} w={380} h={50}>
          <Heading color={"white"}>Edit Profile</Heading>
        </Button>
        <Button  bg={"#38bdf8"} mt={7} h={50}>
          <Heading color={"white"}>Keluar</Heading>
        </Button>
      </VStack>
    </>
  );
};

export default Profile;