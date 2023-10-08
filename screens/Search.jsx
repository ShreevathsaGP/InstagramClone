import { Dimensions, Image, TextInput, StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";

import { BlurView } from "@react-native-community/blur";

// icons
import Ionic from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

// components
import Content from "../components/Content";

const Search = () => {
	const [focusImage, setFocusImage] = useState(null);
	const focusOpacity = 0.7;

	const setFocus = (image) => {
		setFocusImage(image);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={{ width: "100%" }}>
					<View
						style={{
							margin: 10,
							borderRadius: 10,
							backgroundColor: "#EBEBEB",
							flexDirection: "row",
							height: 45,
						}}
					>
						<View style={{ marginLeft: 12, alignItems: "center", justifyContent: "center" }}>
							<Ionic name="search" size={22} color="black" />
						</View>
						<TextInput
							multiline={false}
							placeholder="Search"
							placeholderTextColor="#909090"
							style={{
								width: Dimensions.get("window").width - 75,
								fontSize: 16,
								marginLeft: 8,
							}}
						></TextInput>
					</View>
				</View>
				<Content imageFocus={setFocus} />
			</View>

			{focusImage ? (
				<>
					<StatusBar
						backgroundColor={`rgba(112, 111, 108, ${focusOpacity})`}
						barStyle="dark-content"
					/>
					<View
						style={{
							zIndex: 2,
							backgroundColor: `rgba(112, 111, 108, ${focusOpacity})`,
							position: "absolute",
							left: 0,
							top: 0,
							height: "100%",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						}}
					>
						<View
							style={{
								backgroundColor: "rgb(245, 245, 245)",
								borderRadius: 10,
								left: 20,
								position: "absolute",
								width: Dimensions.get("window").width - 40,
							}}
						>
							<View
								style={{
									marginVertical: 10,
									marginLeft: 15,
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Image
									source={{ uri: focusImage }}
									style={{ borderRadius: 100, width: 35, height: 35 }}
								/>
								<Text style={{ color: "black", marginLeft: 10, fontWeight: 500, fontSize: 13 }}>
									user.name
								</Text>
							</View>
							<Image
								source={{ uri: focusImage }}
								style={{
									width: Dimensions.get("window").width - 40,
									height: Dimensions.get("window").width - 40,
								}}
							/>
							<View
								style={{
									marginHorizontal: 20,
									marginVertical: 10,
									justifyContent: "space-between",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Ionic name="heart-outline" size={30} color="black" />
								<Ionic name="person-circle-outline" size={30} color="black" />
								<Feather name="navigation" size={25} color="black" />
								<Feather name="more-vertical" size={25} color="black" />
							</View>
						</View>
					</View>
				</>
			) : null}
		</>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		paddingBottom: 65,
		width: "100%",
		// backgroundColor: "blue",
	},
});
