import React, { useEffect, useState } from 'react';
import { Alert, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import FIREBASE from '../config/FIREBASE';
import { Header } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VStack, Text, FlatList, Image, HStack, Box, Divider, Icon, Button, Modal } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const Product = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Benih Ikan' },
    { key: 'second', title: 'Ikan Kecil' },
    { key: 'third', title: 'Ikan Besar' },
  ]);

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
      const existingCartJSON = await AsyncStorage.getItem('cart'); // ambil data dari tabel cart di asynstorage
      const existingCart = existingCartJSON ? JSON.parse(existingCartJSON) : []; //Datanya dijadiin JSON

      const itemExists = existingCart.some((cartItem) => cartItem.id === newItem.id); //Ngecek datanya udah pernah ada atau engga

      if (itemExists) { //Kalau datanya udah ada, bakal muncul peringatan ini
        Alert.alert('Peringatan!', 'Barang sudah ada di keranjang');
      } else { //Kalau datanya belum ada, dia inputkan datanya ke cart asynstorage
        const newCart = [...existingCart, newItem];
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
      }
    } catch (error) {
      console.error('Error handling addToCart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', {
          item: {
            image: item.imageUrl,
            title: item.namaproduct,
            content: item.productDescription,
            price: item.hargajual,
            jenis: item.kategoriproduct,
            stok: item.stok,
            id: item.id,
          },
        })
      }>
      <Box>
        <HStack>
          <Image source={{ uri: item.imageUrl }} style={{ width: 140, height: 140 }} alt='Gambar Produk'/>
          <VStack>
            <Box mx={5} my={2}>
              <Text bold fontSize={23}>{item.namaproduct}</Text>
              <Text my={2} bold>Rp. {item.hargajual}/kg </Text>
              <Button w={"70%"} h={10} bg={"#4ade80"} onPress={() => addToCart(item)}>
                <HStack>
                  <Icon as={<Ionicons name="cart" />} size="6" color="black" />
                  <Text bold ml={3}>Tambah</Text>
                </HStack>
              </Button>
            </Box>
          </VStack>
        </HStack>
      </Box>
      <Divider />
    </TouchableOpacity>
  );

  const ProductListTab = ({ route }) => {
    const { key } = route;
    const filteredProducts = products.filter((item) => item.kategoriproduct === getCategory(key));

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
        return 'Ikan Kecil';
      case 'third':
        return 'Ikan Besar';
      default:
        return '';
    }
  };

  const renderScene = SceneMap({
    first: ProductListTab,
    second: ProductListTab,
    third: ProductListTab,
  });

  const layout = useWindowDimensions();

  return (
    <>
      <Header title={'Product'} withBack={true} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
};

export default Product;
