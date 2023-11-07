import { Header } from "../components";
import { Text, TouchableOpacity } from "react-native"
import { View, Box, ScrollView, FlatList, Image, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import datas from "../datas";

const Article = () => {
  const navigation = useNavigation(); //untuk screen

  const renderitem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        //untuk navigati ke detail artikel dan mengirimkan data yang diklik(data disimpan di itemDikirim)
        onPress={() => navigation.navigate("Detail Article", { itemDikirim: item })}
      >
        <Box
          p={"4"}
          borderBottomColor={"coolGray.300"}
          borderBottomWidth={1}
          flexDirection="row"
          flex={1}
        >
          <Box flex={1}  >
            <Image
              source={{ uri: item.image }}
              w="full"
              h="full"
              alt="Gambar "
              width={200}
              height={130}
              borderRadius={200}
              size={85}
            />
          </Box>
          <Box flex={1.5}>
            <View bgColor={"#38bdf8"} borderRadius={10} mr={20}>
              <Text style={{ fontSize: 12, color: "#FDFFFF"}} >{item.date}</Text>
            </View>
            <Heading lineHeight={"md"} fontSize={"md"}>
              {item.title}
            </Heading>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title={"Article"} />
      <FlatList
        data={datas}
        renderItem={renderitem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Article;