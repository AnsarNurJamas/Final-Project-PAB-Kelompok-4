import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./screens/home";
import About from "./screens/about";
import Product from "./screens/product";
import Profile from "./screens/profile";
import Moremenu from "./screens/moremenu";
import ProductDetail from "./screens/ProductDetail";
import Checkout from "./screens/checkout";
import Succes from "./screens/succes";
import Login from "./screens/login";
import Register from "./screens/register";
import History from "./screens/history";
import DetailHistory from "./screens/detailhistory";
import DetailArticle from "./screens/detailArticle";
import EditProfile from "./screens/editprofile";
import Article from "./screens/article";
import Faq from "./screens/faq";

// Navigator Declaration
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const noHead = { headerShown: false };

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Product":
              iconName = "cube-outline";
              break;
            case "About":
              iconName = "newspaper-outline";
              break;
            case "more":
              iconName = "grid-outline";
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? "white" : color}
            />
          );
        },
        tabBarIconStyle: { marginTop: 5 },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: '#38bdf8',
        },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text color={focused ? "white" : color} mb={2}>
              {children}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={noHead} />
      <Tab.Screen name="Product" component={Product} options={noHead} />
      <Tab.Screen name="About" component={About} options={noHead} />
      <Tab.Screen name="more" component={Moremenu} options={noHead} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Tabs" component={Tabs} options={noHead} />
          <Stack.Screen
            name="Detail Article"
            component={DetailArticle}
            options={noHead}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={noHead}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={noHead}
          />
          <Stack.Screen
            name="Succes"
            component={Succes}
            options={noHead}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={noHead}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={noHead}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={noHead}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={noHead}
          />
          <Stack.Screen
            name="DetailHistory"
            component={DetailHistory}
            options={noHead}
          />
          <Stack.Screen
          name="Profile" 
          component={Profile} 
          options={noHead} 
          />
          <Stack.Screen 
          name="Article" 
          component={Article} 
          options={noHead} 
          />
          <Stack.Screen 
          name="Faq" 
          component={Faq} 
          options={noHead} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;