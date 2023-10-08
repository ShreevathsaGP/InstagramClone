import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

// icons
import Ionic from "react-native-vector-icons/Ionicons";

// styles
import { common } from "../styles/common";

// components
import PostsAndStories from "../components/PostsAndStories";

const Home = () => {
	const storiesRef = useRef(null);
	const postsRef = useRef(null);

	return (
		<View style={[common.container, styles]}>
			{/* header */}
			<View
				style={{
					justifyContent: "space-between",
					display: "flex",
					flexDirection: "row",
					paddingHorizontal: 15,
					alignItems: "center",
				}}
			>
				<Text
					style={{ color: "black", fontFamily: "Lobster-Regular", fontSize: 25, fontWeight: "500" }}
				>
					Instantgram
				</Text>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						width: "20%",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Ionic name="heart-outline" size={25} color={"black"} />
					<Ionic name="chatbubble-ellipses-outline" size={25} color={"black"} />
				</View>
			</View>

			{/* stories */}
			<View style={{ height: "100%" }}>
				{/* stories is the header component of posts flat list*/}
				<PostsAndStories />
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	paddingTop: "1.5%",
	height: "100%",
	width: "100%",
});
