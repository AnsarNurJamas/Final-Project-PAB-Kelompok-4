import { Box, Text, ScrollView, VStack, Heading } from "native-base"
import { Header } from "../components"

const Notifikasi = () => {
    return (
        <>
            <Header title={"Notifikasi"} withBack />
            <ScrollView>
                <Box mt={3} w={"90%"} h={100} alignSelf={"center"} bg={"cyan.300"} borderRadius={10}>
                    <VStack>
                        <Heading ml={5} my={3} mx={5}>Notifikasi 1</Heading>
                        <Text mx={5}>Transaksi pertama anda sudah berhasil, dan pesanan anda sedang di proses</Text>
                    </VStack>
                </Box>
                <Box mt={3} w={"90%"} h={100} alignSelf={"center"} bg={"cyan.300"} borderRadius={10}>
                    <VStack>
                        <Heading ml={5} my={3} mx={5}>Notifikasi 1</Heading>
                        <Text mx={5}>Transaksi pertama anda sudah berhasil, dan pesanan anda sedang di proses</Text>
                    </VStack>
                </Box>
            </ScrollView>
        </>
    )
}

export default Notifikasi