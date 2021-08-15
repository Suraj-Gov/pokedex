import React from "react";
import {StatusBar} from "expo-status-bar"
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pokemon() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto"></StatusBar>
			<Text>Home!</Text>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	}
})