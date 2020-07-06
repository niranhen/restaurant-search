/* eslint-disable no-param-reassign */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';

const Stars = ({ avgReviews, index }) => {
	const stars = [];
	let delay;
	if (typeof index !== 'undefined') {
		if (index === 0) {
			delay = 2300;
		} else if (index === 1) {
			delay = 4400;
		} else if (index === 2) {
			delay = 6450;
		} else {
			delay = 0;
		}
	} else {
		delay = 2000;
	}

	for (let i = 0; i < 5; i++, delay += 200) {
		if (avgReviews >= 1) {
			if (
				typeof index === 'undefined' ||
				index === 0 ||
				index === 1 ||
				index === 2
			) {
				stars.push(
					<Animatable.View
						animation='fadeIn'
						duration={2000}
						delay={delay}
						key={i}
					>
						<MaterialIcons
							key={i}
							style={styles.starsStyle}
							name='star'
						/>
					</Animatable.View>
				);
			} else {
				stars.push(
					<MaterialIcons
						key={i}
						style={styles.starsStyle}
						name='star'
					/>
				);
			}
			avgReviews--;
		} else if (avgReviews < 1 && avgReviews > 0) {
			if (
				typeof index === 'undefined' ||
				index === 0 ||
				index === 1 ||
				index === 2
			) {
				stars.push(
					<Animatable.View
						animation='fadeIn'
						duration={2000}
						delay={delay}
						key={i}
					>
						<MaterialIcons
							key={i}
							style={
								typeof index !== 'undefined'
									? [
											styles.starsStyle,
											{
												transform: [{ rotateY: '180deg' }],
											},
									  ]
									: styles.starsStyle
							}
							name='star-half'
						/>
					</Animatable.View>
				);
			} else {
				stars.push(
					<MaterialIcons
						key={i}
						style={
							typeof index !== 'undefined'
								? [
										styles.starsStyle,
										{
											transform: [{ rotateY: '180deg' }],
										},
								  ]
								: styles.starsStyle
						}
						name='star-half'
					/>
				);
			}
			avgReviews--;
		} else {
			if (
				typeof index === 'undefined' ||
				index === 0 ||
				index === 1 ||
				index === 2
			) {
				stars.push(
					<Animatable.View
						animation='fadeIn'
						duration={2000}
						delay={delay}
						key={i}
					>
						<MaterialIcons
							key={i}
							style={styles.starsStyle}
							name='star-border'
						/>
					</Animatable.View>
				);
			} else {
				stars.push(
					<MaterialIcons
						key={i}
						style={styles.starsStyle}
						name='star-border'
					/>
				);
			}
			avgReviews--;
		}
	}
	return (
		<View
			style={
				typeof index !== 'undefined'
					? styles.viewStarsStyle
					: styles.viewStarsStyleItemExpanded
			}
		>
			{stars}
		</View>
	);
};

export default Stars;

const styles = StyleSheet.create({
	viewStarsStyleItemExpanded: {
		flexDirection: 'row',
	},
	viewStarsStyle: {
		flexDirection: 'row-reverse',
		alignSelf: 'flex-end',
	},
	starsStyle: {
		fontSize: 24,
		color: 'gold',
	},
});
