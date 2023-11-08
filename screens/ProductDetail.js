import { Heading, ScrollView, Center, Text, FlatList, Box, Image, Button, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import datas from "../datas";
import { TouchableOpacity } from "react-native";

const ProductDetail = ({ route, navigation }) => {
  const { image, title, content, price } = route.params.item;

    const Checkout = () => {
    // Navigasi ke halaman lain (ganti "ProductDetail" dengan nama halaman tujuan Anda)
    navigation.navigate("Checkout", { item: route.params.item });
  };

  // Get the params
  // const params = route.params.item;
  return (
    <>
      <Header title={"Product Detail"} withBack="true" />
        <Box p={2} shadow={3} borderRadius={10} mr={3} ml={3} mt={3} mb={3} h={590}>
        <Image
            source={{ uri: image }}
            width={400}
            height={200}
            alt={title} // Deskripsi gambar (optional)
             // Ukuran gambar (sesuaikan dengan kebutuhan)
            resizeMode="cover" // Mode tata letak gambar (sesuaikan dengan kebutuhan)
          />
        <Heading mt={10} textAlign={"center"}>{title}</Heading>
        <Text ml={6} mb={10} mt={10}>{content}</Text>
        </Box>
        <HStack bg={"white"} shadow={5} space={2} alignItems="center" position="absolute" bottom={0} left={0} w={400} h={90}>
        <Button
            bg="#38bdf8"
            h={50}
            ml={5}
            w={350}
            onPress={Checkout}
          >
           <Box flex={1} flexDirection="row" justifyContent="justify-between" alignItems="center">
              <Box  ml={2}>
                <Heading fontSize={20} color="white">Beli Sekarang</Heading>
              </Box>
              <Box mr={2}>
                <Heading fontSize={20} color="white">{price}</Heading>
              </Box>
            </Box>
          </Button>
        </HStack>
    </>
  );
};

export default ProductDetail;
