import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getDatabase, ref, onValue } from 'firebase/database';
import { TouchableOpacity } from 'react-native';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import FIREBASE from '../config/FIREBASE';
import { Header } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VStack, View, Text, FlatList, Image, HStack, Box, Divider, Icon, Button, Modal, ScrollView } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';



const Product = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

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

  const redirectToCart = () => {
    setModalVisible(false);
    navigation.navigate('Cart', { items: cart }); // Assuming 'Cart' is the name of your cart screen
  };

  const addToCart = (item) => {
    const newItem = {
      id: item.id,
      title: item.namaproduct,
      price: item.hargajual,
      image: item.imageUrl,
      jenis: item.kategoriproduct,
      // ... (other properties you may want to include)
    };

    // Update the state and AsyncStorage with the new cart data
    setCart((prevCart) => {
      const newCart = [...prevCart, newItem];
      AsyncStorage.setItem('cart', JSON.stringify(newCart)).catch((error) => {
        console.error('Error saving cart to AsyncStorage:', error);
      });
      return newCart;
    });
  };

  const removeItemFromCart = (itemId) => {
    // Update the state and AsyncStorage with the new cart data after removing the item
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart)).catch((error) => {
        console.error('Error saving cart to AsyncStorage:', error);
      });
      return updatedCart;
    });
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((accumulator, item) => accumulator + Number(item.price), 0);
    return totalPrice.toFixed(0);
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

  const ProductListTabThree = ({ route }) => {
    const { key } = route;
  
    // Filter products based on the tab key
    const filteredProducts = products.filter((item) => {
      let categoryToDisplay = '';
  
      if (key === 'three') {
        categoryToDisplay = 'Ikan Besar';
      } else {
        // Add other conditions for additional categories if needed
      }
  
      return item.kategoriproduct === categoryToDisplay;
    });
    return (
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };


  const ProductListTab = ({ route }) => {
    const { key } = route;

    // Filter products based on the tab key
    const filteredProducts = products.filter((item) => {
      let categoryToDisplay = '';

      if (key === 'first') {
        categoryToDisplay = 'Benih Ikan';
      } else if (key === 'second') {
        categoryToDisplay = 'Ikan Kecil';
      } else {
        categoryToDisplay = 'Ikan Besar'; // Add other conditions for additional categories if needed
      }

      return item.kategoriproduct === categoryToDisplay;
    });

    return (
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  // Define your other tab scenes similarly

  const renderScene = SceneMap({
    first: ProductListTab,
    second: ProductListTab,
    three: ProductListTabThree, // Assuming you have a third category scene
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Benih Ikan' },
    { key: 'second', title: 'Ikan Kecil' },
    { key: 'three', title: 'Ikan Besar' },
  ]);

  return (
    <>
      <Header title={'Product'} withBack={true} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <Modal
        isOpen={isModalVisible}
        onClose={closeModal}
      >
        <Modal.Content w={"85%"} h={"650"}>
          <Modal.CloseButton />
          <Modal.Header>Keranjang Belanja</Modal.Header>
          <Modal.Body >
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                Kembali
              </Button>
              <Button onPress={redirectToCart}>
                Beli Sekarang
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Product;
