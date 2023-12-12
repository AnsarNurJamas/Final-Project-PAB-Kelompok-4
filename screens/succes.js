import { Header } from "../components";
import { Box, ScrollView, Heading, Divider, Text, HStack, Button } from "native-base";

const Succes = ({ route, navigation }) => {
    const { image, title, content, price } = route.params.item;

    const Home = () => {
        navigation.navigate("Home");
      };

    return (
        <>
            <Header title={"FISEESH"} withBack="true" />
            <Box p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={330}>
                <Heading ml={4} mt={5}> Pembelian Berhasil </Heading>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <Text mt={3} ml={5}>Jl Teuku Umar 3/10 </Text>
                <Text ml={5} mt={2}>Tambaksari, Pacarkembang</Text>
                <Text ml={5} mt={2}>Lamongan, Jawa Timur </Text>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <HStack justifyContent="space-between">
                    <Text ml={5} mt={3}>{title} x3</Text>
                    <Text mr={5} mt={3}>Rp 90.000</Text>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text ml={5} mt={2}>Ongkos Kirim</Text>
                    <Text mr={5} mt={2}>Rp 20.000</Text>
                </HStack>
                <Divider borderColor="blue" mt={3} ml={5} mr={2} w={310} />
                <HStack justifyContent="space-between">
                    <Heading fontSize={20} ml={4} mt={5}> Total </Heading>
                    <Heading fontSize={20} mr={4} mt={5}> Rp 110.000 </Heading>
                </HStack>
            </Box>
            <Box bg={"white"} shadow={5} space={2} alignItems="center" position="absolute" bottom={0} left={0} w={"100%"} h={90}>
                <Button
                    bg="#38bdf8"
                    mt={5}
                    h={50}
                    w={340}
                    onPress={Home}
                >
                    <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center">
                        <Box ml={2}>
                            <Heading fontSize={20} color="white">Kembali</Heading>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </>
    );
};

export default Succes;