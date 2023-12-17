import React, { useEffect, useState } from "react";
import { Tabs, Tab, Heading, ScrollView, Center, Text, FlatList, Box, Image, Button, HStack, Divider, VStack } from "native-base";
import { Header } from "../components";
import FIREBASE from '../config/FIREBASE';

const DetailHistory = ({ route, navigation }) => {

  return (
    <>
      <Header title={"Detail Pembelian"} withBack="true" />
      <Tabs>
        <Tab heading="Tab 1">
          {/* Konten untuk Tab 1 */}
          <Box p={4}>
            <Heading>Tab 1 Content</Heading>
          </Box>
        </Tab>
        <Tab heading="Tab 2">
          {/* Konten untuk Tab 2 */}
          <Box p={4}>
            <Heading>Tab 2 Content</Heading>
          </Box>
        </Tab>
      </Tabs>
    </>
  );
};

export default DetailHistory;

