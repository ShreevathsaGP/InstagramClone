import {
	FlatList,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

// icons
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// navigation
import { useNavigation } from "@react-navigation/native";

// components
import Stories from "./Stories";

import axios from "axios";

const RenderPost = ({ item, index, navigation }) => {
	const [like, setLike] = useState(false);
	const [bookmark, setBookmark] = useState(false);

	return (
		<View style={styles.postContainer}>
			<View style={{ flexDirection: "row", justifyContent: "space-between", height: 50 }}>
				<View
					style={{
						width: "70%",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "start",
					}}
				>
					<Image
						style={{ marginLeft: 10, height: 35, width: 35, borderRadius: 50 }}
						source={{ uri: item.picture.thumbnail }}
					/>
					<Text style={{ fontWeight: 500, marginLeft: 10, color: "black", fontSize: 13 }}>
						{item.email.split("@")[0]}
					</Text>
				</View>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Feather name="more-vertical" style={{ color: "black", fontSize: 20 }} />
				</View>
			</View>
			<Image style={{ height: 300, width: 360 }} source={{ uri: item.image }} />
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View
					style={{ marginVertical: 7, width: "40%", flexDirection: "row", justifyContent: "start" }}
				>
					<TouchableOpacity
						onPress={() => {
							setLike(!like);
						}}
						activeOpacity={1}
					>
						<AntDesign
							name={like ? "heart" : "hearto"}
							style={{ marginLeft: 15, fontSize: 25, color: like ? "red" : "black" }}
						/>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.8}>
						<Ionic
							name="chatbubble-outline"
							style={{ marginLeft: 15, fontSize: 25, color: "black" }}
						/>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.8}>
						<Feather name="navigation" style={{ marginLeft: 15, fontSize: 25, color: "black" }} />
					</TouchableOpacity>
				</View>

				<View>
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {
							setBookmark(!bookmark);
						}}
					>
						<FontAwesome
							name={bookmark ? "bookmark" : "bookmark-o"}
							style={{ marginRight: 15, fontSize: 25, color: "black" }}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View
				style={{
					justifyContent: "space-evenly",
					flexDirection: "column",
					alignItems: "start",
					marginLeft: 10,
				}}
			>
				<View style={{ color: "black" }}>
					<Text style={{ marginBottom: 2, color: "black" }}>
						Liked by <Text style={{ fontWeight: 500 }}>sm.username</Text> and{" "}
						<Text style={{ fontWeight: 500 }}>62,000 others</Text>
					</Text>
					<Text style={{ marginBottom: 2, color: "black", fontWeight: 400 }}>
						Insert post caption here.
					</Text>
					<Text style={{ marginBottom: 2, color: "rgba(0, 0, 0, 0.5)" }}>
						View all 1,633 comments
					</Text>
				</View>
			</View>
		</View>
	);
};

// filter keys from object
const filterKeys = (obj, keys) => {
	return Object.fromEntries(keys.map((key) => [key, obj[key]]));
};

const PostsAndStories = () => {
	const randomUserLink = "https://randomuser.me/api/?results=10";
	const randomImageLink = "https://random.imagecdn.app/v1/image?width=360&height=300";
	const defaultImage =
		"https://plus.unsplash.com/premium_photo-1686464487058-db679d44aa89?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NjY2NjEzNw&ixlib=rb-4.0.3&q=80&w=360";

	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const navigation = useNavigation();
	const listRef = useRef(null);

	const getPosts = async () => {
		setIsLoading(true);

		try {
			const response = await axios.get(randomUserLink);
			const users = response.data.results.map((obj) => filterKeys(obj, ["email", "picture"]));

			// make image requests
			const imageRequests = users.map(async (user) => {
				try {
					const imageResponse = await axios.get(randomImageLink);
					return { ...user, image: imageResponse.data };
				} catch (err) {
					console.log(`Error while retreiving random image: ${err}`);
					return { ...user, image: defaultImage };
				}
			});

			const newPosts = await Promise.all(imageRequests);
			setPosts((prevPosts) => [...prevPosts, ...newPosts]);
		} catch (err) {
			console.log(`Error while getting posts: ${err}`);
		}

		setIsLoading(false);
	};

	// load more pages
	const loadMore = () => {
		setCurrentPage((prev) => prev);
	};

	// loading circle
	const renderLoader = () => {
		return isLoading ? (
			<View
				style={{
					height: 100,
					paddingTop: 20,
					alignContent: "center",
					justifyContent: "start",
				}}
			>
				<ActivityIndicator size="large" color="black" />
			</View>
		) : null;
	};

	// render on mount and when currentPage is incremented
	useEffect(() => {
		getPosts();
	}, [currentPage]);

	return (
		<View style={styles.container}>
			<FlatList
				scrollEnabled
				ref={listRef}
				data={posts}
				renderItem={({ item, index }) => (
					<RenderPost item={item} index={index} navigation={navigation} />
				)}
				keyExtractor={(item) => item.email} // each item should have a unique key
				ListHeaderComponent={Stories}
				ListFooterComponent={renderLoader}
				onEndReached={loadMore}
				onEndReachedThreshold={0}
				contentContainerStyle={styles.contentContainer}
			/>
		</View>
	);
};

export default PostsAndStories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 40, // leave space for the bottom tabs
	},
	contentContainer: {},
	postContainer: {
		// backgroundColor: "pink",
		marginBottom: 10,
	},
});
