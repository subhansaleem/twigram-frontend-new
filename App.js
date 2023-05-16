import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import LandingPage from "./Screens/LandingPage";
import Signup from "./Screens/signup";
import Profile from "./Screens/Profile";
import OTP from "./Screens/OTP";
import InfluencerProfile from "./Screens/InfluenceProfile";
import Home from "./Screens/Home";
import Addcall from "./Screens/Addcall";
import Coins from "./Screens/Coins";
import Influencers from "./Screens/Influencers";
import EditProfile from "./Screens/EditProfile";
import { createContext } from "react";
import { StatusBar } from "react-native";
import { ProfileProvider } from "./Components/profilecontext";
// import Test from "./Screens/Test";
export default function App() {
  const Stack = createNativeStackNavigator();
  //const ProfileContext = createContext(null);

  return (
    <TailwindProvider>
      <ProfileProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Test" component={Test} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Signup" component={Signup} />
            {/* <Stack.Screen name="OTP" component={OTP} /> */}

            {/* <Stack.Screen name="CandlestickChart" component={Test} /> */}
            <Stack.Screen name="Coins" component={Coins} />

            <Stack.Screen name="Profile" component={Profile} />

            <Stack.Screen
              name="InfluencerProfile"
              component={InfluencerProfile}
            />
            <Stack.Screen name="Addcall" component={Addcall} />
            <Stack.Screen name="Influencers" component={Influencers} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar
          style="auto"
          barStyle="light-content"
          hidden={false}
          backgroundColor="#1d1e1d"
          translucent={true}
        />
      </ProfileProvider>
    </TailwindProvider>
  );
}
