import React, { useEffect, useState } from 'react';
import { Alert, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import FIREBASE from '../config/FIREBASE';
import { Header } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VStack, Text, FlatList, Image, HStack, Box, Divider, Icon, Button, Modal, Input } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const Product = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [index, setIndex] = useState(route.params?.tabIndex || 0);
  const [searchText, setSearchText] = useState('');
  const { searchTextt } = route.params || {};
  const [routes] = useState([
    { key: 'first', title: 'Benih Ikan' },
    { key: 'second', title: 'Ikan' },
    { key: 'third', title: 'Udang' },
    { key: 'four', title: 'Semua Produk' },

  ]);
  const { category, tabIndex } = route.params || {};
  const initialIndex = tabIndex || 0;
  const filteredProducts = searchTextt
    ? products.filter((item) =>
      item.namaproduct.toLowerCase().includes(searchTextt.toLowerCase())
    )
    : products;

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCart(JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      }
    };

    loadCartFromStorage();

    const db = getDatabase(FIREBASE.app());
    const productRef = ref(db, 'Product');
    const unsubscribe = onValue(productRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productList = Object.keys(data).map(async (key) => {
          const product = {
            id: key,
            ...data[key],
          };
          const storage = getStorage(FIREBASE.app());
          const imageRef = storageRef(storage, `images/${product.gambar}.jpg`);
          const imageUrl = await getDownloadURL(imageRef);
          return { ...product, imageUrl };
        });
        Promise.all(productList).then((updatedProducts) => {
          setProducts(updatedProducts);
        });
      }
    });

    return () => unsubscribe();
  }, []);


  const addToCart = async (item) => {
    const newItem = {
      id: item.id,
      title: item.namaproduct,
      price: item.hargajual,
      image: item.imageUrl,
      jenis: item.kategoriproduct,
    };

    try {
      const existingCartJSON = await AsyncStorage.getItem('cart');
      const existingCart = existingCartJSON ? JSON.parse(existingCartJSON) : [];

      const itemExists = existingCart.some((cartItem) => cartItem.id === newItem.id);

      if (itemExists) {
        Alert.alert('Peringatan!', 'Barang sudah ada di keranjang');
      } else {
        const newCart = [...existingCart, newItem];
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);

        // Show alert after adding item to the cart
        Alert.alert('Sukses!', 'Barang berhasil ditambahkan ke keranjang');
      }
    } catch (error) {
      console.error('Error handling addToCart:', error);
    }
  };




  const renderItem = ({ item, }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', { product: item })
      }>
      <Box my={2} w={'90%'} borderWidth={1} h={120} alignSelf={'center'} borderRadius={10}>
        <HStack>
          <Image ml={2} mt={2} borderRadius={10} source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} alt='Gambar Produk' />
          <VStack>
            <Box mx={5} my={2}>
              <Text mt={1} bold fontSize={20}>{item.namaproduct}</Text>
              <Text my={1} bold>Rp. {item.hargajual}/kg </Text>
              {item.stok > 0 ? (
                <Button
                  mt={1}
                  w={'70%'}
                  h={8}
                  bg={'#4ade80'}
                  onPress={() => addToCart(item)}
                >
                  <HStack>
                    <Icon as={<Ionicons name='cart' />} size='5' color={'black'} />
                    <Text bold ml={3}>Tambah</Text>
                  </HStack>
                </Button>
              ) : (
                <Text fontSize={15} color="red.500">Stok Habis</Text>
              )}
            </Box>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  const ProductListTab = ({ route }) => {
    const { key } = route;
    const filteredProducts =
      key === 'four'
        ? products.filter((item) =>
          item.namaproduct.toLowerCase().includes(searchText.toLowerCase())
        )
        : products
          .filter((item) => item.kategoriproduct === getCategory(key))
          .filter((item) =>
            item.namaproduct.toLowerCase().includes(searchText.toLowerCase())
          );

    return (
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const getCategory = (key) => {
    switch (key) {
      case 'first':
        return 'Benih Ikan';
      case 'second':
        return 'Ikan';
      case 'third':
        return 'Udang';
      case 'four':
        return 'Semua Produk';
      default:
        return '';
    }
  };


  const renderScene = SceneMap({
    first: ProductListTab,
    second: ProductListTab,
    third: ProductListTab,
    four: ProductListTab,

  });

  const layout = useWindowDimensions();

  return (
    <>
      <Header title={'Product'} />
      <Box bg={'#1197FD'} w={'100%'} h={12}>
        <Input
          fontSize={16}
          borderRadius={10}
          borderColor={'black'}
          alignSelf={'center'}
          my={3}
          h={9}
          w={'85%'}
          color={'white'}
          placeholderTextColor={'white'}
          placeholder='Cari Product'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          InputLeftElement={<Icon ml='2' size='5' color='white' as={<Ionicons name='ios-search' />} />}
        ></Input>
      </Box>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        initialIndex={initialIndex}
      />
    </>
  );
};

export default Product;
