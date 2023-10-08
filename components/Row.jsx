import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import React from "react";

const Row = ({ i1, i2, i3, imageFocus }) => {
	const paddingWidth = 4;
	const imageWidth = Dimensions.get("window").width / 3 - paddingWidth;
	return (
		<View
			style={{
				marginBottom: paddingWidth + 2,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<TouchableOpacity
				delayPressIn={200}
				onPressIn={() => {
					imageFocus(i1);
				}}
				onPressOut={() => {
					imageFocus(null);
				}}
				activeOpacity={0.9}
			>
				<Image source={{ uri: i1 }} style={{ width: imageWidth, height: imageWidth }} />
			</TouchableOpacity>

			<TouchableOpacity
				delayPressIn={200}
				onPressIn={() => {
					imageFocus(i2);
				}}
				onPressOut={() => {
					imageFocus(null);
				}}
				activeOpacity={0.9}
			>
				<Image source={{ uri: i2 }} style={{ width: imageWidth, height: imageWidth }} />
			</TouchableOpacity>

			<TouchableOpacity
				delayPressIn={200}
				onPressIn={() => {
					imageFocus(i3);
				}}
				onPressOut={() => {
					imageFocus(null);
				}}
				activeOpacity={0.9}
			>
				<Image source={{ uri: i3 }} style={{ width: imageWidth, height: imageWidth }} />
			</TouchableOpacity>
		</View>
	);
};

export default Row;

const styles = StyleSheet.create({});
