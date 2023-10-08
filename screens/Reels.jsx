import { StatusBar, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

// icons
import Feather from "react-native-vector-icons/Feather";

import ReelComponent from "../components/ReelComponent";

const Reels = () => {
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("window").width;
	return (
		<>
			{/* <StatusBar backgroundColor={"black"} barStyle={"light-content"} /> */}
			<View
				style={{
					width: windowWidth,
					height: windowHeight,
					backgroundColor: "black",
					position: "relative",
				}}
			>
				<View
					style={{
						// backgroundColor: "blue",
						width: "100%",
						position: "absolute",
						top: 0,
						left: 0,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: 10,
						zIndex: 2,
					}}
				>
					<Text style={{ marginLeft: 15, color: "white", fontSize: 22, fontWeight: 600 }}>
						Reels
					</Text>

					<View style={{ marginRight: 15, justifyContent: "center", alignItems: "center" }}>
						<Feather name="camera" size={27} color="white" />
					</View>
				</View>
				<ReelComponent />
			</View>
		</>
	);
};

export default Reels;

const styles = StyleSheet.create({});
