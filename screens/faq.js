import React from 'react';
import { Header } from "../components";
import { Box, Center, Heading, ScrollView, Text } from "native-base";

const Faq = () => {
  const faqData = [
    {
      question: 'Apa itu aplikasi penjualan ikan?',
      answer: 'Aplikasi Fiseesh ini merupakan  platform penjualan ikan dari offline store sehingga memungkinkan untuk memasarkan produk ikan secara online, menerima pesanan dari pelanggan, dan mengelola transaksi penjualan ikan secara efisien'
    },
    {
      question: 'Apakah aplikasi ini mendukung pengiriman ikan ke rumah pelanggan?',
      answer: 'Tentu saja, untuk saat ini kami masih melayani untuk daerah jawa timur dan sekitarnya saja.'
    },
    {
      question: 'Bagaimana aplikasi ini memastikan keamanan ikan selama pengiriman?',
      answer: 'Kami bekerja sama dengan pihak pengiriman untuk memastikan keamanan dan kualitas dalam pengiriman.'
    }
  ];

  return (
    <>
      <Header title={"FAQ"} withBack />
      <ScrollView>
        <Center>
          <Box width="80%" my={17} p={4} borderWidth={1} borderRadius={8} borderColor="info.300">
            {faqData.map((item, index) => (
              <Box key={index} mb={4}>
                <Heading size="md" mb={2}>
                  {item.question}
                </Heading>
                <Text>{item.answer}</Text>
              </Box>
            ))}
          </Box>
        </Center>
      </ScrollView>
    </>
  );
};

export default Faq;
