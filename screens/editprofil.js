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
            <Box p={12} alignItems="center">
                <Icon as={Ionicons} name="person-circle-outline" size={200} color="black" />
                <Heading>EDIT PROFILE</Heading>
            </Box>
            <Divider w={370} alignSelf="center" justifyContent="center" />
            <VStack>
                <HStack mr={5} ml={5} mt={7} justifyContent="space-between">
                    <Text bold>Nama</Text>
                    <Input variant="outline" h={10} w={250} placeholder="Masukan Nama Baru" value={profile.name}
                        onChangeText={(text) => setProfile({ ...profile, name: text })}></Input>
                </HStack>
                <HStack mr={5} ml={5} mt={5} justifyContent="space-between">
                    <Text bold>No Telepon</Text>
                    <Input variant="outline" h={10} w={250} placeholder="Masukan No Telepon Baru" value={profile.notelephone}
                        onChangeText={(text) => setProfile({ ...profile, notelephone: text })}></Input>
                </HStack>
                <HStack mr={5} ml={5} mt={5} mb={3} justifyContent="space-between">
                    <Text bold>Alamat</Text>
                    <Input variant="outline" h={10} w={250} placeholder="Masukan Alamat Baru" value={profile.adress}
                        onChangeText={(text) => setProfile({ ...profile, adress: text })}></Input>
                </HStack>
            </VStack>
            <VStack pt={32} alignSelf="center" justifyContent="center">
                <Button onPress={() => {
                    editProfile(profile, navigation);
                }} bg={"#38bdf8"} mt={7} w={370} h={50}>
                    <Heading color={"white"}>Simpan</Heading>
                </Button>
            </VStack>
        </>
    );
};

export default EditProfile;
