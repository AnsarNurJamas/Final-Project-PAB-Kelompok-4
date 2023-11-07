import React from 'react';
import { Text, SafeAreaView, } from 'react-native';
import { Header } from "../components";
import { Image, View, ScrollView } from 'native-base';


const DetailArticle = ({ route }) => {
  const { itemDikirim } = route.params; //mengekstrak itemDikirim dari parameter route

  return (

    <SafeAreaView>
      <Header title={"Article"} withBack="true" />
      <ScrollView>
        <View>
          <Image
            width={"auto"}
            height={200}
            source={{ uri: itemDikirim.image }} //kalau pkai link pakai uri
            alt="Gambar"
            marginBottom={15}
          />
          <Text style={{fontSize:13, paddingHorizontal:15, marginBottom:9, color:"black"}} >
            {itemDikirim.date}
          </Text>

          <Text style={{fontSize: 20, fontWeight: "bold", paddingHorizontal: 15 }} >
            {itemDikirim.title}
            </Text>

            <View 
            p={3}
            width={380}
            marginBottom={10}
            alignSelf= "center"
            borderBottomColor={"gray.300"}
            borderBottomWidth={1}
            />

            <Text style = {{paddingHorizontal:15, color:"black", marginBottom: 10, textAlign:"justify"}}>
              {itemDikirim.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailArticle;
