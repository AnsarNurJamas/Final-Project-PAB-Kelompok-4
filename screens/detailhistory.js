import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Image, ScrollView, HStack, Heading } from "native-base";
import FIREBASE from '../config/FIREBASE';
import { Header } from "../components";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

const DetailHistory = ({ route }) => {
  const { transactionId } = route.params;
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  const fetchTransactionDetails = async () => {
    try {
      const transactionSnapshot = await FIREBASE.database().ref(`Transactions/${transactionId}`).once('value');
      const transactionData = transactionSnapshot.val();

      if (!transactionData) {
        setError('Transaction not found.');
        setLoading(false);
        return;
      }

      setTransactionDetails(transactionData);

      const productIds = transactionData.cart.map(cartItem => cartItem.id);
      const productDetailsPromises = productIds.map(productId =>
        FIREBASE.database().ref(`Product/${productId}`).once('value')
      );

      const productDetailsSnapshots = await Promise.all(productDetailsPromises);
      const productDetailsData = productDetailsSnapshots.map(snapshot => snapshot.val() || {});
      setProductDetails(productDetailsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      setError('Error fetching transaction details. Please try again.');
      setLoading(false);
    }
  };



  return (
    <>
      <Header title={"Detail History"} withBack="true" />
      <ScrollView>
        {transactionDetails && transactionDetails.cart.map((cartItem, index) => {
          const product = productDetails[index];

          return (
            <Box key={index} p={2} shadow={5} borderRadius={10} mr={3} ml={3} mt={4} mb={3} h={"145px"} bg={"white"}>
              <HStack>
                <Image
                  source={{ uri: cartItem.image }}
                  alt={`Product Image - ${cartItem.title}`}
                  w={"35%"}
                  h={"120px"}
                  mt={1}
                  ml={1}
                  borderRadius={10}
                />
                <VStack mx={2} my={2}>
                  <Heading>{cartItem.title}</Heading>
                  <Text my={1}>{cartItem.jenis}</Text>
                  <Text>{`Jumlah: ${cartItem.quantity || 1}`}</Text>
                  <Text mt={1}>{`Total Harga: Rp ${cartItem.totalPrice || 0}`}</Text>
                  {/* Add more details as needed */}
                </VStack>
              </HStack>
            </Box>
          );
        })}
      </ScrollView>
    </>
  );
};

export default DetailHistory;
