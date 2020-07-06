import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Tags = ({ categories }) => {
	const tags = [];
	for (
		let i = 0, delay = 1600;
		i < categories.length;
		i++, delay += 150
	) {
		if (i === categories.length - 1) {
			tags.push(
				<Animatable.Text
					animation='fadeIn'
					delay={delay}
					duration={1000}
					style={styles.tagsStyle}
					key={i}
				>
					{categories[i].title}
				</Animatable.Text>
			);
		} else {
			tags.push(
				<Animatable.Text
					animation='fadeIn'
					delay={delay}
					duration={1000}
					style={styles.tagsStyle}
					key={i}
				>
					{categories[i].title},{' '}
				</Animatable.Text>
			);
		}
	}
	return <View style={styles.viewTagsStyle}>{tags}</View>;
};

export default Tags;

const styles = StyleSheet.create({
	viewTagsStyle: {
		marginHorizontal: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tagsStyle: {
		fontSize: 20,
		color: 'gray',
	},
});
