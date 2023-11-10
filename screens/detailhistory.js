import { Heading, ScrollView, Center, Text, FlatList, Box, Image, Button, HStack, Divider, VStack } from "native-base";
import { Header } from "../components";

const DetailHistory = ({ route, navigation }) => {

    const Product = () => {
        navigation.navigate("Product");
    };

    return (
        <>
            <Header title={"Detail Pembelian"} withBack="true" />
            <Box bg={"white"} shadow={5} w={385} h={620} mr={3} ml={3} mt={3} mb={3} >
                <Image
                    source={require("../assets/ikanlelee.png")}
                    width={90}
                    mt={5}

                    alignSelf="center"
                    justifyContent="center"
                    height={160}
                    alt="ikan"
                />
                <VStack>
                    <Heading p={5}>Detail</Heading>
                    <Divider w={350} alignSelf="center" justifyContent="center" />
                    <HStack ml={5} mr={5} mt={3} justifyContent="space-between">
                        <Text bold>Produk</Text>
                        <Text>Ikan Lele</Text>
                    </HStack>
                    <HStack mr={5} ml={5} mt={3} justifyContent="space-between">
                        <Text bold>Jumlah</Text>
                        <Text >3 Kg</Text>
                    </HStack>
                    <HStack mr={5} ml={5} mt={3} justifyContent="space-between">
                        <Text bold>Harga</Text>
                        <Text >Rp 90.000</Text>
                    </HStack>
                    <HStack mr={5} ml={5} mt={3} justifyContent="space-between">
                        <Text bold>Metode Pembayaran</Text>
                        <Text >Transfer Bank</Text>
                    </HStack>
                    <Divider mt={5} w={350} alignSelf="center" justifyContent="center" />
                    {/* <Text ml={5} mt={5}> Jl Lamongan Sejahtera</Text>
                    <Text> Tambaksari, Gubeng</Text>
                    <Text> Lamongan, Jawa Timur</Text> */}

                    <HStack ml={5} mr={5} mt={3} justifyContent="space-between">
                        <Text bold>Nama</Text>
                        <Text>Denny Indra</Text>
                    </HStack>
                    <HStack mr={5} ml={5} mt={3} justifyContent="space-between">
                        <Text bold>No Telepon</Text>
                        <Text >081234546554</Text>
                    </HStack>
                    <Divider mt={5} w={350} alignSelf="center" justifyContent="center" />
                    <Text mr={5} ml={5} mt={3} bold>Jl Lamongan Jaya</Text>
                    <Text mr={5} ml={5} mt={3} bold>Tambaksari, Gubeng</Text>
                    <Text mr={5} ml={5} mt={3} bold>Lamongan, Jawa Timur</Text>
                </VStack>
            </Box>

            <Box alignSelf="center"
                justifyContent="center" bg={"white"} shadow={5} space={2} alignItems="center" position="absolute" bottom={0} left={0} w={420} h={90}>
                <Button bg="#38bdf8"
                    h={50}
                    alignSelf="center"
                    justifyContent="center"
                    w={350}
                    onPress={Product}
                    >
                    <Heading color={"white"}>Beli Kembali</Heading>
                </Button>
            </Box>

        </>
    );
};

export default DetailHistory;