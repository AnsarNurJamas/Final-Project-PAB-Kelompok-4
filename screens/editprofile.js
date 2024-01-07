import React, { useState, useEffect } from 'react';
import { Header } from "../components";
import { Box, Center, Icon, ScrollView, Text, VStack, Stack, Button, HStack, Heading, Divider, Input } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getData, storeData } from '../utils/localStorage';
import { editProfile } from '../actions/AuthAction';

const EditProfile = ({ navigation }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        notelephone: '',
        adress: '',
    });

    // KODE UNTUK MENDAPATKAN DATA USER
    useEffect(() => {
        getData('user').then((res) => {
            const data = res;
            if (data) {
                setProfile(data);
            }
        });
    }, []);

    return (
        <>
            <Header title={"PROFILE"} withBack="True" />
            <Box w={"90%"} alignSelf={"center"} shadow={5} borderRadius={10} h={600} mt={7} bg={"white"}>
                <Box p={12} alignItems="center">
                    <Icon as={Ionicons} name="person-circle-outline" size={200} color="black" />
                    <Heading>EDIT PROFILE</Heading>
                </Box>
                <Divider w={"90%"} alignSelf="center" justifyContent="center" bg={"black"} />
                <VStack>
                    <HStack mr={5} ml={5} mt={7} justifyContent="space-between">
                        <Text mt={2} bold>Nama</Text>
                        <Input borderRadius={15} borderWidth={1} borderColor={"black"} variant="outline" h={10} w={"70%"} placeholder="Masukan Nama Baru" value={profile.name}
                            onChangeText={(text) => setProfile({ ...profile, name: text })}></Input>
                    </HStack>
                    <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
                        <Text mt={2} bold>No Telepon</Text>
                        <Input borderRadius={15} borderWidth={1} borderColor={"black"} variant="outline" h={10} w={"70%"} placeholder="Masukan No Telepon Baru" value={profile.notelephone}
                            onChangeText={(text) => setProfile({ ...profile, notelephone: text })}></Input>
                    </HStack>
                    <HStack mr={5} ml={5} mt={5} mb={3} justifyContent="space-between">
                        <Text mt={2} bold>Alamat</Text>
                        <Input borderRadius={15} borderWidth={1} borderColor={"black"} variant="outline" h={10} w={"70%"} placeholder="Masukan Alamat Baru" value={profile.adress}
                            onChangeText={(text) => setProfile({ ...profile, adress: text })}></Input>
                    </HStack>
                    <Button alignSelf={"center"} onPress={() => {
                        editProfile(profile, navigation);
                    }} bg={"#38bdf8"} mt={3} w={"90%"} h={10} borderRadius={10}>
                        <Heading color={"white"} fontSize={20}>Simpan</Heading>
                    </Button>
                </VStack>
            </Box>
        </>
    );
};

export default EditProfile;