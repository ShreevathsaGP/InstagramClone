import * as React from "react";
import { StatusBar, StyleSheet, View, Text, SafeAreaView } from "react-native";

// hooks
import { useState, useEffect } from "react";

// screens
import Home from "./screens/Home";
import Search from "./screens/Search";
import Reels from "./screens/Reels";
import NewPost from "./screens/NewPost";
import Profile from "./screens/Profile";
import ViewStory from "./subscreens/ViewStory";
import ViewPost from "./subscreens/ViewPost";

// icons
import Ionic from "react-native-vector-icons/Ionicons";

// styles
import { common } from "./styles/common";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./navigation/BottomTab";

const Stack = createNativeStackNavigator();

function App({ navigation }) {
	return (
		<SafeAreaView style={styles}>
			<StatusBar backgroundColor={"rgb(245, 245, 245)"} barStyle="dark-content" />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Bottom" component={BottomTab} />
					<Stack.Screen name="ViewStory" component={ViewStory} />
					<Stack.Screen name="ViewPost" component={ViewPost} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

export default App;

const styles = StyleSheet.create({
	height: "100%",
	display: "flex",
	flexDirection: "column",
});
