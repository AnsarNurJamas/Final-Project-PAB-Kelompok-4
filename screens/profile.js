import React, { useState } from 'react';
import { Header } from "../components";
import { Box, Center, Icon, ScrollView, Text, VStack, Stack, Button, HStack, Heading, Divider, Input } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profile = ({ navigation }) => {
  // Add state variables using useState
  const [nama, setNama] = useState("Ekky Dea Audry");
  const [email, setEmail] = useState("Ekky@gmail.com");
  const [noTelepon, setNoTelepon] = useState("08123213412");
  const [alamat, setAlamat] = useState("Jl. Lamongan Jaya");

  const Login = () => {
    navigation.navigate("Login");
  };

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
          <Text>{nama}</Text>
        </HStack>
        <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
          <Text bold>Email</Text>
          <Text>{email}</Text>
        </HStack>
        <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
          <Text bold>No Telepon</Text>
          <Text>{noTelepon}</Text>
        </HStack>
        <HStack mr={5} ml={5} mt={5} mb={3} justifyContent="space-between">
          <Text bold>Alamat</Text>
          <Text>{alamat}</Text>
        </HStack>
      </VStack>
      <VStack alignSelf="center" justifyContent="center">
        <Button onPress={EditProfile} bg={"#38bdf8"} mt={5} w={380} h={50}>
          <Heading color={"white"}>Edit Profile</Heading>
        </Button>
        <Button onPress={Login} bg={"#38bdf8"} mt={7} h={50}>
          <Heading color={"white"}>Keluar</Heading>
        </Button>
      </VStack>
    </>
  );
};

export default Profile;