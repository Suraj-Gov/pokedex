import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { PokemonBaseI } from '../types';

interface props {
	pokemonData: PokemonBaseI
}

const PokemonTile: React.FC<props> = ({pokemonData}) => {
	return (
		<View style={styles.container}>
			<Image style={styles.thumbnail} source={{uri: pokemonData.ThumbnailImage}} />
			<Text style={styles.name}>{pokemonData.name}</Text>			
		</View>
	)
};

const styles = StyleSheet.create({
	thumbnail: {
		width: 110,
		height: 110,
	},
	container: {
		width: 140,
		height: 140,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 12,
		backgroundColor: "#fff",
		paddingVertical: 20
	},
	name: {
		fontWeight: "bold",
		margin: 4,
	}
})

export default PokemonTile