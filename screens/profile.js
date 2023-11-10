import { Header } from "../components";
import { Box, Center, Icon, ScrollView, Text, VStack, Stack, Button, HStack, Heading } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = ({navigation}) => {
    const Login = () => {
        // Navigasi ke halaman lain (ganti "ProductDetail" dengan nama halaman tujuan Anda)
        navigation.navigate("Succes" , { item: route.params.item });
      };
    return (

        <>
            <Header title={"PROFILE"} />
            <Center flex={1} justifyContent="center" p={"4"}>
                <Icon as={Ionicons} name="person-circle-outline" size={20} color="black" />
                <HStack space={2} justifyContent="center" alignItems="center" paddingTop={"10"}>
                <TouchableOpacity
              onPress={() => navigation.navigate('login')}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Icon as={Ionicons} name="log-in-outline" size="md" />
              <Text>Login</Text>
            </TouchableOpacity>
                    <Button variant="subtle" leftIcon={<Icon as={Ionicons} name="log-out-outline" size="md" />}>
                        Register
                    </Button>
                </HStack>
                <Heading paddingTop={"10"} textAlign={"center"}>Anda Belum Login, Silahkan Melakukan Login Terlebih Dahulu</Heading>
            </Center>
        </>
    );
};

export default Profile;