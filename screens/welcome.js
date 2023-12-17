import React from 'react';
import { View, Text, Button, Box, Image, Heading, Center, Divider, Input } from 'native-base';

const Welcome = ({ route, navigation }) => {
  const Login = () => {
    // Navigasi ke halaman lain (ganti "ProductDetail" dengan nama halaman tujuan Anda)
    navigation.navigate("Login");
  };

  return (
    <>
        <Box mb={50} pl={10} pr={10}>
          <Button backgroundColor={"#38bdf8"} mb={4} mt={6} onPress={Login}>
            <Text bold color={"white"}>Masuk</Text>
          </Button>
        </Box>
    </>
  );
};

export default Welcome;