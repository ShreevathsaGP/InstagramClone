import React, { useState, useEffect } from "react";
import {
	Dimensions,
	StyleSheet,
	View,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
	TextInput,
	Animated,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const ViewStory = ({ route, navigation }) => {
	const { image, username } = route.params;
	const [progress, setProgress] = useState(new Animated.Value(0));

	useEffect(() => {
		// can only view story for 5 seconds
		let countdown = setTimeout(() => {
			navigation.goBack();
		}, 5000);

		Animated.timing(progress, {
			toValue: 5,
			duration: 5000,
			useNativeDriver: false,
		}).start();

		return () => clearTimeout(countdown);
	});

	const progressWidth = progress.interpolate({
		inputRange: [0, 5],
		outputRange: ["0%", "100%"],
	});

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={"black"} barStyle="light-content" />
			<View style={styles.animationContainer}>
				<Animated.View style={[styles.animatedView, { width: progressWidth }]}></Animated.View>
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.header}>
					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "start" }}>
						<Image
							style={{
								marginHorizontal: 10,
								height: 35,
								width: 35,
								borderRadius: 50,
								opacity: 0.95,
							}}
							source={{ uri: image }}
						/>
						<Text style={{ color: "rgb(245, 245, 245)" }}>{username}</Text>
					</View>
					<View style={{ paddingRight: 10, justifyContent: "center" }}>
						<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
							<Ionic name="close" style={{ fontSize: 20, color: "white", opacity: 0.9 }} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.imageContainer}>
					<View
						style={{
							borderRadius: 20,
							backgroundColor: "grey",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ color: "white" }}>Story goes here.</Text>
					</View>
				</View>

				<View style={styles.footer}>
					<TextInput
						placeholder="Send message"
						placeholderTextColor="white"
						style={{
							borderColor: "white",
							borderRadius: 25,
							flexGrow: 1,
							height: 50,
							marginLeft: 10,
							paddingLeft: 20,
							borderWidth: 1,
							fontSize: 15,
							color: "white",
						}}
					/>
					<View style={styles.interaction}>
						<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
							<Ionic name="heart-outline" size={30} color={"white"} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
							<Feather name="navigation" style={{ fontSize: 30, color: "white" }} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ViewStory;

const styles = StyleSheet.create({
	interaction: {
		flexDirection: "row",
		width: 100,
		justifyContent: "space-evenly",
		paddingRight: 10,
	},
	contentContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
		width: "100%",
		paddingTop: "5%",
	},
	header: {
		height: 40,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignnItems: "center",
	},
	imageContainer: {
		height: 200,
		marginLeft: "5%",
		marginRight: "5%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		height: 80,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		height: "100%",
		backgroundColor: "black",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	animationContainer: {
		height: 3,
		width: "96%",
		borderWidth: 0.5,
		backgroundColor: "gray",
		position: "absolute",
		top: "1.5%",
		zIndex: 1,
	},
	animatedView: {
		height: "100%",
		backgroundColor: "white",
	},
});
