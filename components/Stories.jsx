import { TouchableOpacity, Image, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect, forwardRef } from "react";

// icons
import Entypo from "react-native-vector-icons/Entypo";

// navigation
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { FlatList } from "react-native";

function RenderStory({ item, index, navigation }) {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => {
				navigation.push("ViewStory", {
					username: item.email.split("@")[0],
					image: item.picture.thumbnail,
				});
			}}
		>
			<View style={styles.storyContainer}>
				<View style={styles.storyCircle}>
					<Image style={styles.Image} source={{ uri: item.picture.medium }}></Image>
					{index === 0 && (
						<View style={styles.plusContainer}>
							<Entypo name="circle-with-plus" style={styles.plusIcon} />
						</View>
					)}
				</View>
				<Text style={[styles.storyText]}>{item.email.split(".")[0]}</Text>
			</View>
		</TouchableOpacity>
	);
}

// filter keys from object
const filterKeys = (obj, keys) => {
	return Object.fromEntries(keys.map((key) => [key, obj[key]]));
};

// export default function Stories(props) {
const Stories = forwardRef((props, ref) => {
	const [stories, setStories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigation = useNavigation();
	const listRef = useRef(null);

	// get random stories (faces w/ email)
	const getStories = () => {
		setIsLoading(true);
		wantedKeys = ["email", "picture"];

		axios.get(`https://randomuser.me/api/?results=10`).then((res) => {
			const newStories = res.data.results.map((obj) => filterKeys(obj, wantedKeys));
			setStories(newStories);
			setIsLoading(false);
		});
	};

	// loading circle
	const renderLoader = () => {
		return isLoading ? (
			<View style={{ paddingLeft: 25, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="black" />
			</View>
		) : null;
	};

	// on mount get stories
	useEffect(() => {
		getStories();
	}, []);

	return (
		<View style={styles.view}>
			<FlatList
				horizontal
				ref={listRef}
				data={stories}
				renderItem={({ item, index }) => (
					<RenderStory item={item} index={index} navigation={navigation} />
				)}
				keyExtractor={(item) => item.email}
				ListFooterComponent={renderLoader}
				onEndReachedThreshold={0}
				contentContainerStyle={styles.contentContainer}
			/>
		</View>
	);
});

export default Stories;

const styles = StyleSheet.create({
	view: {
		borderBottomWidth: 0.3,
		borderColor: "rgba(0, 0, 0, 0.2)",
	},
	contentContainer: {
		// backgroundColor: "blue",
		height: 120,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: "1%",
	},
	storyContainer: {
		marginRight: 10,
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	storyText: {
		fontSize: 12,
		color: "rgba(0, 0, 0, 0.85)",
	},
	storyCircle: {
		// backgroundColor: "blue",
		borderColor: "#c13584",
		borderWidth: 3,
		height: 92,
		width: 92,
		borderRadius: 46,
		justifyContent: "center",
		alignItems: "center",
	},
	Image: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 0.5,
		borderColor: "grey",
	},
	loader: {
		alignItems: "center",
	},
	plusContainer: {
		position: "absolute",
		bottom: 1,
		right: 1,
		// right: 10,
		zIndex: 1,
	},
	plusIcon: {
		fontSize: 25,
		color: "#405de6",
		backgroundColor: "rgb(245, 245, 245)",
		borderRadius: 100,
	},
});
