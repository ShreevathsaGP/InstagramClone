import { Image, TouchableOpacity, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Video from "react-native-video";

import { SwiperFlatList } from "react-native-swiper-flatlist";

// icons
import Ionic from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RenderReel = ({ item, index, currentIndex }) => {
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("screen").width;

	const zuckImage =
		"https://img.thedailybeast.com/image/upload/dpr_2.0/c_crop,h_4335,w_4335,x_1015,y_0/c_limit,w_128/d_placeholder_euli9k,fl_lossy,q_auto/v1647379694/GettyImages-1178141599_z2ls4z";

	const [mute, setMute] = useState(false); // false means not muted
	const [like, setLike] = useState(false);

	const videoRef = useRef(null); // ref to the video (ref dont cause re-renders)

	const onBuffer = (buffer) => {
		console.log("buffering", buffer);
	};

	const onError = (error) => {
		console.log("error", error);
	};

	return (
		<>
			<View style={{ width: windowHeight, height: windowHeight, position: "relative" }}>
				<TouchableOpacity
					onPress={() => setMute(!mute)}
					activeOpacity={0.9}
					style={{
						width: "100%",
						height: "100%",
					}}
				>
					<Video
						videoRef={videoRef}
						onBuffer={onBuffer}
						onError={onError}
						repeat={true}
						resizeMode="cover"
						paused={false}
						source={item.item.video}
						muted={mute}
						style={{
							width: windowWidth,
							height: "100%",
						}}
					/>
				</TouchableOpacity>
				<View
					style={{
						zIndex: 2,
						// backgroundColor: "blue",
						position: "absolute",
						bottom: 75,
						left: 0,
						height: 140,
						width: windowWidth,
						paddingLeft: 10,
					}}
				>
					<View
						style={{
							alignItems: "center",
							flexDirection: "row",
							width: windowWidth - 100,
						}}
					>
						<Image
							source={{ uri: zuckImage }}
							style={{ width: 40, height: 40, borderRadius: 100 }}
						/>
						<Text style={{ paddingLeft: 10, fontWeight: 500, fontSize: 16, color: "white" }}>
							original.poster
						</Text>
					</View>
					<View style={{ paddingTop: 5, paddingLeft: 2 }}>
						<Text style={{ fontSize: 14, color: "white" }}>Insert caption here.</Text>
						<Text style={{ fontSize: 12, paddingTop: 6, color: "white" }}>
							Liked by <Text style={{ fontWeight: 500 }}>user.name</Text> and{" "}
							<Text style={{ fontWeight: 500 }}>62,000 others</Text>
						</Text>

						<View
							style={{
								alignItems: "center",
								flexDirection: "row",
								marginTop: 8,
								width: 220,
								padding: 7,
								borderRadius: 100,
								backgroundColor: "rgba(80, 80, 80, 0.7)",
							}}
						>
							<Ionic style={{ paddingLeft: 1 }} name="musical-notes" size={15} color={"white"} />
							<Text style={{ marginLeft: 8, fontSize: 12, color: "white" }}>
								original.poster · Original audio
							</Text>
						</View>
					</View>
				</View>

				<View
					style={{
						zIndex: 20,
						justifyContent: "flex-start",
						// backgroundColor: "blue",
						position: "absolute",
						left: windowWidth - 60,
						alignItems: "center",
						top: windowHeight - 370,
						height: windowHeight - 175,
						width: 60,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setLike(!like);
						}}
						activeOpacity={1}
						style={{ alignItems: "center" }}
					>
						<Ionic
							name={like ? "heart" : "heart-outline"}
							size={35}
							color={like ? "red" : "white"}
						/>
						<Text
							style={{
								fontWeight: 500,
								paddingTop: 10,
								textAlign: "center",
								width: 60,
								fontSize: 13,
								color: "white",
							}}
						>
							1.1M
						</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} style={{ marginTop: 20, alignItems: "center" }}>
						<Ionic name="chatbubble-outline" size={35} color="white" />
						<Text
							style={{
								fontWeight: 500,
								paddingTop: 10,
								textAlign: "center",
								width: 60,
								fontSize: 13,
								color: "white",
							}}
						>
							2.8K
						</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} style={{ marginTop: 20, alignItems: "center" }}>
						<Feather name="navigation" size={32} color="white" />
						<Text
							style={{
								fontWeight: 500,
								paddingTop: 10,
								textAlign: "center",
								width: 60,
								fontSize: 13,
								color: "white",
							}}
						>
							271K
						</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} style={{ marginTop: 20, alignItems: "center" }}>
						<Feather name="more-vertical" size={27} color="white" />
					</TouchableOpacity>
				</View>

				{mute && (
					<Ionic
						name="volume-mute"
						size={25}
						style={{
							color: "white",
							position: "absolute",
							top: windowHeight / 2.6,
							left: windowWidth / 2.45,
							backgroundColor: "rgba(50, 50, 50, 0.5)",
							borderRadius: 200,
							padding: 20,
						}}
					/>
				)}
			</View>
		</>
	);
};

const videoData = [
	{ video: require("../data/sampleReels/video_1.mp4") },
	{ video: require("../data/sampleReels/video_2.mp4") },
	{ video: require("../data/sampleReels/video_3.mp4") },
	{ video: require("../data/sampleReels/video_4.mp4") },
];

const ReelComponent = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleIndexChange = ({ index }) => {
		setCurrentIndex(index);
	};

	return (
		<SwiperFlatList
			data={videoData}
			vertical={true}
			onChangeIndex={handleIndexChange}
			renderItem={(item, index) => (
				<RenderReel item={item} index={index} currentIndex={currentIndex} />
			)}
			keyExtractor={(item, index) => index}
		/>
	);
};

export default ReelComponent;

const styles = StyleSheet.create({});
