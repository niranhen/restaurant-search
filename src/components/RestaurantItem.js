import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	// Image,
	ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Image from 'react-native-image-progress';
// import ProgressBar from 'react-native-progress/Bar';

import Stars from '../components/common/Stars';

const RestaurantItem = ({ item, index }) => {
	const [elevation, setElevation] = useState(0);

	let delay1, delay2, delay3, delay4, waitElevation;
	if (index === 0) {
		delay1 = 1500;
		delay2 = 1800;
		delay3 = 2000;
		delay4 = 3250;
		waitElevation = 2300;
	} else if (index === 1) {
		delay1 = 3400;
		delay2 = 3900;
		delay3 = 4100;
		delay4 = 5300;
		waitElevation = 4400;
	} else if (index === 2) {
		delay1 = 5450;
		delay2 = 5950;
		delay3 = 6150;
		delay4 = 7350;
		waitElevation = 6450;
	}

	useEffect(() => {
		if (Platform.OS === 'android') {
			setTimeout(() => {
				for (let i = 1; i <= 13; i++) {
					setElevation(i);
				}
			}, waitElevation);
		}
	}, []);

	return index === 0 || index === 1 || index === 2 ? (
		<View
			style={
				index === 0
					? [
							styles.viewStyle,
							{ marginTop: 17, marginBottom: 40 },
					  ]
					: [
							styles.viewStyle,
							{ marginTop: 30, marginBottom: 40 },
					  ]
			}
		>
			<View
				style={
					Platform.OS === 'android'
						? [styles.viewImageStyle, { elevation }]
						: styles.viewImageStyle
				}
			>
				<Animatable.Image
					animation='fadeIn'
					duration={1500}
					delay={delay1}
					style={styles.imageStyle}
					source={{ uri: item.image_url }}
				/>
			</View>
			<View style={styles.viewDetailsStyle}>
				<View style={styles.viewNameLocation}>
					<Animatable.Text
						animation='fadeIn'
						duration={1500}
						delay={delay2}
						style={styles.restaurantName}
					>
						{item.name}
					</Animatable.Text>
					<Animatable.Text
						animation='fadeIn'
						duration={1500}
						delay={delay3}
						style={styles.restaurantLocation}
					>
						{item.location.country}, {item.location.city},{' '}
						{item.location.address1}
					</Animatable.Text>
				</View>
				<View style={styles.viewReviewsRating}>
					<Stars avgReviews={item.rating} index={index} />
					<Animatable.Text
						animation='fadeIn'
						duration={1500}
						delay={delay4}
						style={styles.restaurantReviews}
					>
						{item.review_count}
					</Animatable.Text>
				</View>
			</View>
		</View>
	) : (
		<View
			style={
				index === 19
					? Platform.OS === 'ios'
						? [
								styles.viewStyle,
								{ marginTop: 30, marginBottom: 200 },
						  ]
						: [
								styles.viewStyle,
								{ marginTop: 30, marginBottom: 185 },
						  ]
					: [
							styles.viewStyle,
							{ marginTop: 30, marginBottom: 40 },
					  ]
			}
		>
			<View
				style={
					Platform.OS === 'android'
						? [styles.viewImageStyle, { elevation: 13 }]
						: styles.viewImageStyle
				}
			>
				<Image
					style={styles.imageStyle}
					source={{ uri: item.image_url }}
					indicator={
						<ActivityIndicator
							color='#282d70'
							size='large'
							style={styles.ActivityIndicatorStyle}
						/>
					}
				/>
			</View>
			<View style={styles.viewDetailsStyle}>
				<View style={styles.viewNameLocation}>
					<Text style={styles.restaurantName}>
						{item.name}
					</Text>
					<Text style={styles.restaurantLocation}>
						{item.location.country}, {item.location.city},{' '}
						{item.location.address1}
					</Text>
				</View>
				<View style={styles.viewReviewsRating}>
					<Stars avgReviews={item.rating} index={index} />
					<Text style={styles.restaurantReviews}>
						{item.review_count}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewStyle: {
		alignItems: 'center',
		marginHorizontal: 15,
	},
	viewImageStyle: {
		borderRadius: 6,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 8.3,
		shadowOpacity: 1,
		alignSelf: 'stretch',
	},
	viewDetailsStyle: {
		flex: 1,
		alignSelf: 'stretch',
		width: undefined,
		flexWrap: 'wrap',
	},
	imageStyle: {
		flex: 1,
		alignSelf: 'stretch',
		width: undefined,
		borderRadius: 6,
		height: 180,
	},
	viewNameLocation: {
		alignSelf: 'flex-start',
		position: 'absolute',
		width: '65%',
	},
	viewReviewsRating: {
		position: 'absolute',
		width: '35%',
		alignSelf: 'flex-end',
	},
	restaurantName: {
		fontSize: 18,
		color: 'black',
		alignSelf: 'flex-start',
	},
	restaurantLocation: {
		fontSize: 12,
		color: 'gray',
		alignSelf: 'flex-start',
	},
	restaurantReviews: {
		fontSize: 12,
		color: 'gray',
		alignSelf: 'flex-end',
		marginRight: 2,
	},
	ActivityIndicatorStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default RestaurantItem;
