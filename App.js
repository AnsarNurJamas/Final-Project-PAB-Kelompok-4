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
import EditProfile from "./screens/editprofil";
import DetailHistory from "./screens/detailhistory";
// import Splash from "./screens/splash";
import Cart from "./screens/cart";

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
          alignSelf: "center",
          height: 70,
          width: "95%",
          borderRadius: 10,
          marginBottom: 10,
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
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen
            name="Tabs"
            component={Tabs} options={noHead} />
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
            name="EditProfile"
            component={EditProfile}
            options={noHead}
          />
          {/* <Stack.Screen
            name="Splash"
            component={Splash}
            options={noHead}
          /> */}
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={noHead}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
