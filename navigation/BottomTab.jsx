import { StyleSheet, Text, View } from "react-native";
import React from "react";

// icons
import Ionic from "react-native-vector-icons/Ionicons";

// styles
import common from "../styles/common";

// screens
import Home from "../screens/Home";
import Search from "../screens/Search";
import Reels from "../screens/Reels";
import NewPost from "../screens/NewPost";
import Profile from "../screens/Profile";

// navigation
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator
			backBehavior="history"
			screenOptions={({ route }) => {
				return {
					tabBarHideOnKeyboard: true,
					tabBarShowLabel: false,
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "rgb(250, 250, 250)",
						height: 45,
					},
					tabBarIcon: ({ focused, size, color }) => {
						size = focused ? size + 3 : size + 2;
						switch (route.name) {
							case "Home":
								iconName = focused ? "home-sharp" : "home-outline";
								break;
							case "Search":
								iconName = focused ? "search" : "search-outline";
								break;
							case "NewPost":
								iconName = focused ? "add-circle" : "add-circle-outline";
								break;
							case "Reels":
								iconName = focused ? "play-circle" : "play-circle-outline";
								break;
							case "Profile":
								iconName = focused ? "person" : "person-outline";
								break;
						}

						return <Ionic name={iconName} size={size} color={"black"} />;
					},
				};
			}}
		>
			<Tab.Screen options={{ unmountOnBlur: true }} name="Home" component={Home} />
			<Tab.Screen name="Search" component={Search} />
			<Tab.Screen name="NewPost" component={NewPost} />
			<Tab.Screen name="Reels" component={Reels} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

export default BottomTab;

const styles = StyleSheet.create({});
