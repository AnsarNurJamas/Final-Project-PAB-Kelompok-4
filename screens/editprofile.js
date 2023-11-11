import { Header } from "../components";
import {Box, Divider, Icon, Text, HStack, VStack, Button, Heading, Input } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

const Editprofile = ({navigation}) => {
    const Profile = () => {
        navigation.navigate("Profile");
      };

    return (
        <>
            <Header title={"Edit Profile"} withBack="true" />
            <Box p={12} alignItems="center">
                <Icon as={Ionicons} name="person-circle-outline" size={200} color="black" />
                <Heading>EDIT PROFILE</Heading>
            </Box>
            <Divider w={370} alignSelf="center" justifyContent="center" />
            <VStack>
                <HStack mr={5} ml={5} mt={7} justifyContent="space-between">
                    <Text bold>Nama</Text>
                    <Input placeholder="Mmasukan Nama Baru" w={260}></Input>
                </HStack>
                <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
                    <Text bold>Email</Text>
                    <Input placeholder="Masukan Email Baru" w={260}></Input>
                </HStack>
                <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
                    <Text bold>No Telepon</Text>
                    <Input placeholder="Masukan No Telepon Baru" w={260}></Input>
                </HStack>
                <HStack mr={5} ml={5} mt={5} mb={3} justifyContent="space-between">
                    <Text bold>Alamat</Text>
                    <Input placeholder="Masukan Alamat Baru" w={260}></Input>
                </HStack>
            </VStack>
            <VStack alignSelf="center" justifyContent="center">
                <Button onPress={Profile} bg={"#38bdf8"} mt={7} h={50} w={370}>
                    <Heading color={"white"}>SIMPAN</Heading>
                </Button>
            </VStack>
        </>
    )
}

export default Editprofile;