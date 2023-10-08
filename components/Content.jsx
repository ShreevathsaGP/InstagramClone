import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import images from "../data/searchScreenImages";

import Row from "./Row";

const Content = ({ imageFocus }) => {
	const getContent = () => {};
	const rows = []; // a row of images (each row contains 3 images)

	// generate rows
	for (let i = 0; i < images.length - (images.length % 3); i += 3) {
		rows.push(
			<Row imageFocus={imageFocus} i1={images[i]} i2={images[i + 1]} i3={images[i + 2]} key={i} />
		);
	}

	return (
		<View>
			<ScrollView>{rows}</ScrollView>
		</View>
	);
};

export default Content;

const styles = StyleSheet.create({});
