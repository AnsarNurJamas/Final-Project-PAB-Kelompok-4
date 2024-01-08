import { Text, Image, HStack, Button, Box } from "native-base"
import { useFonts } from "expo-font";
import Svg, { Path } from "react-native-svg";

const Landing = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        'PermanentMarker-Regular': require('../assets/PermanentMarker-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const Login = () => {
        navigation.navigate('Login')
    }
    const Register = () => {
        navigation.navigate('Register')
    }
    return (
        <>
            <Text mt={100} alignSelf={"center"} fontFamily='PermanentMarker-Regular' fontSize={40} color={"#38bdf8"}>FISEESH STORE</Text>
            <Image
                source={require("../assets/landing2.png")}
                w="240"
                h="240"
                alt="Fisheesh Logo"
                mt={4}
                alignSelf={"center"}
            ></Image>
            <Text mx={10} textAlign={"center"} bold fontSize={15}>Hallo Selamat Datang di Aplikasi Fiseesh,
                Aplikasi ini Menjual Beberapa Ikan Kualitas Unggulan</Text>
            <HStack justifyContent={"space-between"} mt={20} >
                <Button w={"35%"} h={10} ml={50} onPress={Register}>
                    <Text bold color={"white"}> Register</Text>
                </Button>
                <Button w={"35%"} h={10} mr={50} bg={"#38bdf8"} onPress={Login}>
                    <Text bold color={"white"}> Login</Text>
                </Button>
            </HStack>
            <Svg xmlns="http://www.w3.org/2000/svg" width={500} height={120} viewBox="0 0 1440 280" style={{ marginTop: -10 }}>
          <Path fill="#38bdf8" fill-opacity="1" d="M0,192L21.8,186.7C43.6,181,87,171,131,186.7C174.5,203,218,245,262,245.3C305.5,245,349,203,393,176C436.4,149,480,139,524,165.3C567.3,192,611,256,655,282.7C698.2,309,742,299,785,282.7C829.1,267,873,245,916,202.7C960,160,1004,96,1047,96C1090.9,96,1135,160,1178,197.3C1221.8,235,1265,245,1309,240C1352.7,235,1396,213,1418,202.7L1440,192L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></Path>
        </Svg>
        <Box mb={10} h={220} backgroundColor={"#38bdf8"} justifyContent="center" alignItems="center"></Box>
        </>
    );
}

export default Landing