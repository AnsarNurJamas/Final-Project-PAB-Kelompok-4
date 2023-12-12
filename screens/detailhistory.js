import React, { useState } from 'react';
import { Heading, Box, Image, Button, HStack, Divider, VStack, Text } from 'native-base';
import { Header } from '../components';

const DetailHistory = ({ navigation }) => {
  // State variables
  const [productDetails, setProductDetails] = useState({
    Produk: 'Ikan Lele',
    Jumlah: '3 Kg',
    Harga: 'Rp 90.000',
    Metode: 'Transfer Bank',
    Nama: 'Denny Indra',
    Nomer: '081234546554',
    Alamat: 'Jl Lamongan Jaya, Jawa Timur',
  });

  const Product = () => {
    navigation.navigate('Product');
  };

  return (
    <>
      <Header title={'Detail Pembelian'} withBack={true} />
      <Box bg={'white'} shadow={5} w={385} h={620} mr={3} ml={5} mt={3} mb={3}>
        <Image
          source={require('../assets/ikanlelee.png')}
          width={90}
          mt={5}
          alignSelf="center"
          justifyContent="center"
          height={160}
          alt="ikan"
        />
        <VStack space={3} p={5}>
          <Heading>Detail</Heading>
          <Divider w={350} alignSelf="center" justifyContent="center" />
          {Object.entries(productDetails).map(([key, value]) => (
            <HStack key={key} ml={5} mr={5} mt={3} justifyContent="space-between">
              <Text bold>{key}</Text>
              <Text>{value}</Text>
            </HStack>
          ))}
          <Divider mt={5} w={350} alignSelf="center" justifyContent="center" />
        </VStack>
      </Box>

      <Box
        alignSelf="center"
        justifyContent="center"
        bg={'white'}
        shadow={5}
        space={2}
        alignItems="center"
        position="absolute"
        bottom={0}
        left={0}
        w={420}
        h={90}
      >
        <Button bg="#38bdf8" h={50} alignSelf="center" justifyContent="center" w={350} onPress={Product}>
          <Heading color={'white'}>Beli Kembali</Heading>
        </Button>
      </Box>
    </>
  );
};

export default DetailHistory;
