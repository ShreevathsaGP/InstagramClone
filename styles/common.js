import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	theme: {
		white: "rgb(245, 245, 245)",
	},
	container: {
		display: "flex",
		backgroundColor: "rgb(245, 245, 245)",
		// flexGrow: 1, // same as flex: 1
		height: "100%",
		flexDirection: "column",
		// justifyContent: "center",
		// alignItems: "center",
	},
});

export { styles as common };
