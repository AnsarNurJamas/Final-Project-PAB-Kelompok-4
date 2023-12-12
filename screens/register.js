import React, { useState } from 'react';
import { useFonts } from "expo-font";
import Svg, { Path } from "react-native-svg";
import { View, Text, Button, Box, Image, Heading, Center, Divider, Input, HStack, Modal, ScrollView } from 'native-base';
import { registerUser } from '../actions/AuthAction';

const Register = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [notelephone, setNotelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [formError, setFormError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onRegister = async () => {
    if (name && email && notelephone && password && adress) {
      const data = {
        name: name,
        email: email,
        notelephone: notelephone,
        password: password,
        adress: adress,
        status: "user",
      };

      console.log(data);

      try {
        const user = await registerUser(data, password);
        navigation.replace("Tabs");
      } catch (error) {
        console.log("Error", error.message);
        setFormError(error.message);
        toggleModal();
      }
    } else {
      setFormError("Harap isi form dengan lengkap dan benar");
      toggleModal();
    }
  };

  const Tabs = () => {
    navigation.navigate("Tabs");
  };

  let [fontsLoaded] = useFonts({
    'PermanentMarker-Regular': require('../assets/PermanentMarker-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Box>
      <Box h={160} backgroundColor={"#38bdf8"} justifyContent="center" alignItems="center">
        <Image
          source={require("../assets/logo.png")}
          size="xl"
          alt="Fisheesh Logo"
          mt={10}
        />
      </Box>
      <Svg xmlns="http://www.w3.org/2000/svg" width={500} height={120} viewBox="2 0 1440 120" style={{ marginTop: -40 }} >
        <Path fill="#38bdf8" fill-opacity="1" d="M0,160L34.3,144C68.6,128,137,96,206,112C274.3,128,343,192,411,186.7C480,181,549,107,617,101.3C685.7,96,754,160,823,186.7C891.4,213,960,203,1029,176C1097.1,149,1166,107,1234,112C1302.9,117,1371,171,1406,197.3L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z">
        </Path>
      </Svg>
      <Box p={5}>
        <Center>
          <Text fontFamily='PermanentMarker-Regular' fontSize={50} color={"#38bdf8"}>FISHEESH</Text>
        </Center>
        <Input
          placeholder="Name"
          variant="underlined"
          value={name}
          onChangeText={(name) => setName(name)}
          keyboardType="default"
          mt={3}
        />
        <Input
          placeholder="No Telephone"
          variant="underlined"
          value={notelephone}
          onChangeText={(notelephone) => setNotelephone(notelephone)}
          keyboardType="default"
          mt={3}
        />
        <Input
          placeholder="Email"
          variant="underlined"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          mt={3}
        />
        <Input
          placeholder="Alamat"
          variant="underlined"
          value={adress}
          onChangeText={(adress) => setAdress(adress)}
          keyboardType="default"
          mt={3}
        />
        <Input
          placeholder="Password"
          variant="underlined"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
          mt={4}
        />
        <Button backgroundColor={"#38bdf8"} mt={60} onPress={() => {
          onRegister();
        }}>
          <Text bold color={"white"}>Register</Text>
        </Button>
      </Box>
      <Svg xmlns="http://www.w3.org/2000/svg" width={500} height={120} viewBox="0 0 1440 280" style={{ marginTop: -40 }}>
        <Path fill="#38bdf8" fill-opacity="1" d="M0,192L21.8,186.7C43.6,181,87,171,131,186.7C174.5,203,218,245,262,245.3C305.5,245,349,203,393,176C436.4,149,480,139,524,165.3C567.3,192,611,256,655,282.7C698.2,309,742,299,785,282.7C829.1,267,873,245,916,202.7C960,160,1004,96,1047,96C1090.9,96,1135,160,1178,197.3C1221.8,235,1265,245,1309,240C1352.7,235,1396,213,1418,202.7L1440,192L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></Path>
      </Svg>
      <Box mb={10} h={220} backgroundColor={"#38bdf8"} justifyContent="center" alignItems="center"></Box>
      <Modal isOpen={isModalVisible} onClose={toggleModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Terjadi Kesalahan</Modal.Header>
          <Modal.Body>
            <Text>{formError}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default Register;