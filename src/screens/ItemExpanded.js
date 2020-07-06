import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Platform,
	TouchableOpacity,
	Dimensions,
	StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';

import yelp from '../api/yelp';
import ReversedFlatList from 'react-native-reversed-flat-list';
import Stars from '../components/common/Stars';
import Tags from '../components/Tags';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ItemExpanded = ({ navigation }) => {
	const id = navigation.getParam('id');
	const [result, setResult] = useState(null);

	const getResult = async id => {
		const response = await yelp.get(`/${id}`);
		setResult(response.data);
	};

	useEffect(() => {
		getResult(id);
	}, []);

	if (!result) {
		return null;
	}
	return (
		<View style={styles.viewStyle}>
			<Animatable.View style={styles.viewRestaurantImage}>
				<Animatable.Image
					animation='fadeIn'
					duration={2000}
					resizeMode={'cover'}
					style={styles.restaurantImage}
					source={{ uri: result.image_url }}
				/>
				{Platform.OS === 'ios' && (
					<TouchableOpacity
						style={styles.iconStyle}
						onPress={() => navigation.goBack(null)}
					>
						<Ionicons
							style={styles.iconStyleSize}
							name='md-arrow-back'
						/>
					</TouchableOpacity>
				)}

				<Animatable.View
					animation='fadeIn'
					duration={1500}
					delay={500}
					style={styles.viewDetails}
				>
					<Animatable.Text
						animation='fadeIn'
						duration={1500}
						delay={1300}
						style={styles.nameStyle}
					>
						{result.name}
					</Animatable.Text>

					<Tags categories={result.categories} />
					<Animatable.View
						animation='fadeIn'
						duration={1500}
						delay={1700}
						style={styles.line}
					/>
					<View style={styles.viewRestaurantLocationStyle}>
						<Animatable.Text
							animation='fadeIn'
							duration={1500}
							delay={1800}
							style={styles.restaurantLocation}
						>
							<EvilIcons
								style={styles.iconPlaceStyle}
								name='location'
							/>
							{result.location.country},{' '}
							{result.location.city},{' '}
							{result.location.address1}
						</Animatable.Text>
					</View>

					<View style={styles.viewOpenAndStars}>
						<View style={styles.viewStarsAndReviews}>
							<Animatable.Text
								animation='fadeIn'
								duration={1500}
								delay={1900}
								style={styles.restaurantReviews}
							>
								{result.review_count}
							</Animatable.Text>
							<Stars avgReviews={result.rating} />
						</View>
						<Animatable.View
							animation='fadeIn'
							duration={1500}
							delay={2950}
							style={styles.viewOpen}
						>
							<Text style={styles.textOpenStyle}>
								{result.hours.is_open_now
									? 'Open now'
									: 'Close now'}
							</Text>
							<Badge
								status={
									result.hours.is_open_now
										? 'success'
										: 'error'
								}
							/>
						</Animatable.View>
					</View>
				</Animatable.View>
			</Animatable.View>
			<View style={styles.listAndTitle}>
				<View style={styles.viewFeaturedItems}>
					<Animatable.Text
						animation='fadeIn'
						delay={3000}
						duration={1500}
						style={styles.textFeaturedItems}
					>
						Featured Items
					</Animatable.Text>
				</View>
				<Animatable.View
					animation='fadeIn'
					delay={3200}
					duration={1500}
					style={styles.viewFlatList}
				>
					<ReversedFlatList
						snapToInterval={SCREEN_WIDTH * 0.86}
						decelerationRate='fast'
						showsHorizontalScrollIndicator={false}
						horizontal
						initialNumToRender={3}
						data={result.photos}
						keyExtractor={photo => photo}
						renderItem={({ item, index }) => (
							<Image
								style={
									index === 0
										? [
												styles.imageItemStyle,
												{ marginLeft: 15 },
										  ]
										: index === 1
										? [
												styles.imageItemStyle,
												{ marginLeft: 15, marginRight: 15 },
										  ]
										: index === 2
										? [
												styles.imageItemStyle,
												{ marginRight: 15 },
										  ]
										: styles.imageItemStyle
								}
								key={item}
								source={{ uri: item }}
							/>
						)}
					/>
				</Animatable.View>
			</View>
			{Platform.OS === 'ios' && (
				<StatusBar barStyle='light-content' />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	viewStyle: {
		flex: 1,
		width: Dimensions.get('window').width,
	},
	iconStyle: {
		position: 'absolute',
		left: 10,
		top: 40,
		height: 30,
		width: 30,
	},
	iconStyleSize: {
		fontSize: 30,
		alignSelf: 'center',
		color: 'white',
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
		...Platform.select({
			ios: {},
			android: {
				elevation: 13,
			},
		}),
	},

	//!the header with Image
	viewRestaurantImage: {
		height: Dimensions.get('window').height * 0.5,
		alignSelf: 'stretch',
		position: 'relative',
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
		width: Dimensions.get('window').width,
	},
	restaurantImage: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height * 0.5,

		...StyleSheet.absoluteFillObject,
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
		resizeMode: 'cover',
	},
	viewDetails: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 8.3,
		shadowOpacity: 1,
		alignSelf: 'stretch',
		...Platform.select({
			ios: {},
			android: {
				elevation: 10,
			},
		}),
		marginHorizontal: 15,
		backgroundColor: 'white',
		alignItems: 'stretch',
		position: 'absolute',
		bottom: -70,
		borderRadius: 10,
		opacity: 0.95,
		right: 0,
		left: 0,
		flex: 1,
	},
	nameStyle: {
		fontSize: 26,
		marginHorizontal: 5,
		opacity: 0.6,
		fontWeight: '500',
	},
	viewFlatList: {
		...Platform.select({
			ios: {
				borderRadius: 6,
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 4,
				},
				shadowRadius: 8.3,
				shadowOpacity: 1,
			},
			android: { elevation: 13 },
		}),
	},
	imageItemStyle: {
		height: SCREEN_HEIGHT * 0.3,
		width: SCREEN_WIDTH * 0.85,
		borderRadius: 15,
	},
	viewStarsStyle: {
		flexDirection: 'row',
	},
	viewStarsAndReviews: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 4,
		left: 5,
	},
	restaurantReviews: {
		fontSize: 14,
		color: 'gray',
		alignSelf: 'center',
		marginRight: 2,
	},
	viewOpenAndStars: {
		flex: 1,
		marginTop: 25,
	},
	viewOpen: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 4,
		right: 10,
		alignItems: 'center',
	},
	textOpenStyle: {
		marginRight: 2,
		opacity: 0.5,
	},
	viewRestaurantLocationStyle: {
		marginTop: 5,
		flexDirection: 'row',
	},
	restaurantLocation: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-start',
	},
	iconPlaceStyle: {
		fontSize: 22,
		alignSelf: 'center',
		marginHorizontal: 5,
		opacity: 0.5,
	},
	line: {
		borderWidth: 0.25,
		borderColor: 'gray',
		borderRadius: 1,
		marginHorizontal: 5,
		opacity: 0.5,
	},
	viewFeaturedItems: {
		alignSelf: 'flex-start',
		marginHorizontal: 15,
		marginBottom: 2,
	},
	textFeaturedItems: {
		fontSize: 25,
		opacity: 0.6,
	},
	listAndTitle: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'space-between',
		...Platform.select({
			ios: {
				bottom: 40,
			},
			android: { bottom: 20 },
		}),
	},
});

export default ItemExpanded;
