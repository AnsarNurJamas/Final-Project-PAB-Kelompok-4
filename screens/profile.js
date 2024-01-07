import React, { useState, useEffect } from 'react';
import { Header } from "../components";
import { Box, Center, Icon, ScrollView, Text, VStack, Stack, Button, HStack, Heading, Divider, Input, View } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { clearStorage, getData } from '../utils/localStorage';
import FIREBASE from '../config/FIREBASE';

const Profile = ({ navigation }) => {
  // Add state variables using useState
  const [profile, setProfile] = useState(null);


  //KODE UNTUK MENGAMBIL DATA USER DARI ASYNCSTORAGE DAN ASYNC STORAGE MENGAMBIL DARI FIREBASE
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

  // KODE UNTUK MELAKUKAN LOG OUT
  const onSubmit = async (profile) => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(async () => {
          // Sign-out successful.
          await clearStorage();
          navigation.replace('Landing');
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    } else {
      navigation.replace('Landing');
    }
  };


  // NAVIGASI KE HALAMAN EDIT PROFILE
  const EditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const History = () => {
    navigation.navigate("History");
  };

  const Artikel = () => {
    navigation.navigate("Artikel");
  };

  const Faq = () => {
    navigation.navigate("Faq");
  };

  return (
    <>
      <ScrollView>
          <View>
            <Box bg={"#38bdf8"} h={"240px"} w={"100%"}
            >
              <Box p={4} alignItems="center">
                <Icon as={Ionicons} name="person-circle-outline" size={200} color="white" />
              </Box>
            </Box>
            <Box bg={"#38bdf8"} h={"100px"} w={"100%"} borderBottomRadius={130}>
              <Heading alignSelf={"center"} color={"white"}>{profile?.name}</Heading></Box>
          </View>

          <Box alignSelf={"center"} bg={"white"} h={"330px"} w={"85%"} borderRadius={20} mt={-16}>
            <HStack justifyContent={"space-between"} mt={5} mx={4}>

              <Button borderRadius={10} bg={"#E7E7E7"} w={"30%"} h={"48%"} shadow={2} onPress={Faq}>
                <Box pt={2} borderWidth={2} borderColor={"#4B65C5"} mt={2} borderRadius={"70px"} alignSelf={"center"} bg={"#38bdf8"} w={"150%"} h={"90%"}>
                  <Ionicons alignSelf={"center"} name="chatbubbles" size={30} color="white" />
                </Box>
                <Text alignSelf={"center"} bold>FAQ</Text>
              </Button>

              <Button borderRadius={10} bg={"#E7E7E7"} w={"30%"} h={"48%"} shadow={2} onPress={History}>
                <Box pt={2} borderWidth={2} borderColor={"#4B65C5"} mt={2} borderRadius={"70px"} alignSelf={"center"} bg={"#38bdf8"} w={"125%"} h={"90%"}>
                  <Ionicons alignSelf={"center"} name="receipt" size={30} color="white" />
                </Box>
                <Text alignSelf={"center"} bold>Riwayat</Text>
              </Button>

              <Button borderRadius={10} bg={"#E7E7E7"} w={"30%"} h={"48%"} shadow={2} onPress={Artikel}>
                <Box pt={2} borderWidth={2} borderColor={"#4B65C5"} mt={2} borderRadius={"70px"} alignSelf={"center"} bg={"#38bdf8"} w={"150%"} h={"90%"}>
                  <Ionicons alignSelf={"center"} name="newspaper" size={30} color="white" />
                </Box>
                <Text alignSelf={"center"} bold>Artikel</Text>
              </Button>
            </HStack>

            <VStack mt={-20}>
              <HStack mr={5} ml={5} mt={4} justifyContent="space-between">
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
            <HStack mx={4} mt={3} justifyContent="space-between">
              <Button onPress={EditProfile} bg={"#38bdf8"} w={"40%"} h={"100%"}>
                <Text fontSize={17} bold color={"white"}>Edit Profile</Text>
              </Button>
              <Button onPress={() => onSubmit(profile)} bg={"#38bdf8"} w={"40%"} h={"100%"}>
                <Text fontSize={17} bold color={"white"}>Keluar</Text>
              </Button>
            </HStack>
          </Box>
      </ScrollView>
    </>
  );
};

export default Profile;
