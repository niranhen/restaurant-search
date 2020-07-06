import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Dimensions,
	StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { sha256 } from 'react-native-crypto-js';
import { Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Asset, FileSystem } from 'expo-asset';

import {
	termChanged,
	locationChanged,
	sortByChanged,
} from '../actions';
import SearchBarLocation from '../components/SearchBarLocation';

class FilterScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFirstTime: true,
			imgPath: require('../../assets/burger.jpg'),
			buttonClicked: 1,
			buttonCuisineClicked: 1,
			location: '',
			source: null,
			images: [],
		};
		this.SCREEN_WIDTH = Dimensions.get('window').width;
		this.SCREEN_HEIGHT = Dimensions.get('window').height;
	}

	async componentDidMount() {
		if (Platform.OS === 'android') {
			StatusBar.setHidden(false);
			StatusBar.setBarStyle = 'light-content';
			StatusBar.setBackgroundColor = 'rgba(0,0,0,0)';
			StatusBar.setTranslucent = false;
		} else {
			StatusBar.setHidden(false);
		}

		const pathImages = [
			require('../../assets/burger.jpg'),
			require('../../assets/pizza.jpg'),
			require('../../assets/coffee.jpg'),
			require('../../assets/italian.jpg'),
			require('../../assets/bbq.jpg'),
			require('../../assets/chinese.jpg'),
			require('../../assets/pasta.jpg'),
			require('../../assets/fastfood.jpg'),
			require('../../assets/healthy.jpg'),
			require('../../assets/international.jpg'),
			require('../../assets/sushi.jpg'),
			require('../../assets/mexican.jpg'),
		];
		for (let i = 0; i <= pathImages.length; i++) {
			let source = pathImages[i];
			try {
				if (typeof source === 'number') {
					await Asset.fromModule(source).downloadAsync();
				} else if (source && source.uri) {
					const parts = source.uri.split('.');
					const ext = parts[parts.length - 1];
					const name = sha256(source.uri);
					const filepath = `${FileSystem.documentDirectory}${name}.${ext}'`;
					const { exists } = await FileSystem.getInfoAsync(
						filepath
					);
					if (exists) {
						source = { uri: filepath };
					} else {
						const { uri } = await FileSystem.downloadAsync(
							source.uri,
							filepath
						);
						source = { uri };
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				if (i === 0) {
					this.setState({ source });
					this.changeStateImages(i, source);
				} else {
					this.changeStateImages(i, source);
				}
			}
		}
	}

	onTermChanged(newTerm) {
		this.props.termChanged(newTerm);
	}

	onLocationChanged(newLocation) {
		this.props.locationChanged(newLocation);
	}

	onSortByChanged(newSort) {
		this.props.sortByChanged(newSort);
	}

	changeStateImages(index, value) {
		const images = [...this.state.images];
		images[index] = value;
		this.setState({ images });
	}

	OnFilterClicked() {
		let sortBy = 'count_review',
			term = ' Burger',
			location = ' NYC';
		//!CuisineButtons
		switch (this.state.buttonCuisineClicked) {
			case 1:
				term = ' Burger';
				break;
			case 2:
				term = ' Pizza';
				break;
			case 3:
				term = ' Coffee';
				break;
			case 4:
				term = ' Italian';
				break;
			case 5:
				term = ' BBQ';
				break;
			case 6:
				term = ' Chinese';
				break;
			case 7:
				term = ' Pasta';
				break;
			case 8:
				term = ' Fast Food';
				break;
			case 9:
				term = ' Healthy';
				break;
			case 10:
				term = ' International';
				break;
			case 11:
				term = ' Sushi';
				break;
			case 12:
				term = ' Mexican';
				break;
			default:
				break;
		}
		//!SortBy
		switch (this.state.buttonClicked) {
			case 1:
				sortBy = 'review_count';
				break;
			case 2:
				sortBy = 'best_match';
				break;
			case 3:
				sortBy = 'rating';
				break;
			default:
				break;
		}
		//!location
		if (this.state.location !== '') {
			location = this.state.location;
		} else {
			location = this.props.location;
		}
		this.props.navigation.getParam('searchApi')(
			term,
			location,
			sortBy
		);
		this.onLocationChanged(location);
		this.onTermChanged(term);
		this.onSortByChanged(sortBy);
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					width: this.SCREEN_WIDTH,
					height: this.SCREEN_HEIGHT,
					backgroundColor: 'rgba(255, 255, 255, 0.0)',
				}}
			>
				<Image
					source={this.state.source}
					style={{
						resizeMode: 'cover',
						flex: 1,
						width: this.SCREEN_WIDTH * 1.3,
						height: this.SCREEN_HEIGHT,
					}}
				/>
				{Platform.OS === 'ios' && (
					<TouchableOpacity
						style={styles.iconStyle}
						onPress={() =>
							this.props.navigation.goBack(null)
						}
					>
						<Ionicons
							style={styles.iconStyleSize}
							name='md-arrow-back'
						/>
					</TouchableOpacity>
				)}
				<View
					style={{
						flex: 1,
						marginHorizontal: 15,
						marginTop:
							Platform.OS === 'android'
								? this.SCREEN_HEIGHT * 0.048
								: this.SCREEN_HEIGHT * 0.08,
					}}
				>
					<View
						style={{ height: this.SCREEN_HEIGHT * 0.6 }}
					>
						<Animatable.Text
							animation='fadeIn'
							delay={25}
							duration={3000}
							style={styles.TypeOfFilter}
						>
							Sort By
						</Animatable.Text>
						<View style={styles.ViewButtonsStyle}>
							<Animatable.View
								animation='fadeIn'
								direction='alternate'
								duration={2000}
								delay={50}
								style={
									this.state.buttonClicked === 1
										? [
												styles.ButtonStyle,
												styles.ButtonStyleRadiusLeft,
												ChangeButtonColor(),
										  ]
										: [
												styles.ButtonStyle,
												styles.ButtonStyleRadiusLeft,
										  ]
								}
							>
								<TouchableOpacity
									onPress={() => {
										this.setState({ buttonClicked: 1 });
									}}
								>
									<Animatable.Text
										animation='fadeIn'
										delay={550}
										duration={1500}
										style={styles.ButtonText}
									>
										Reviews
									</Animatable.Text>
								</TouchableOpacity>
							</Animatable.View>
							<Animatable.View
								style={
									this.state.buttonClicked === 2
										? [
												styles.ButtonStyle,
												ChangeButtonColor(),
										  ]
										: styles.ButtonStyle
								}
								animation='fadeIn'
								delay={300}
								duration={2000}
							>
								<TouchableOpacity
									onPress={() => {
										this.setState({ buttonClicked: 2 });
									}}
								>
									<Animatable.Text
										animation='fadeIn'
										direction='alternate'
										delay={850}
										duration={1500}
										style={styles.ButtonText}
									>
										Best match
									</Animatable.Text>
								</TouchableOpacity>
							</Animatable.View>
							<Animatable.View
								style={
									this.state.buttonClicked === 3
										? [
												styles.ButtonStyle,
												styles.ButtonStyleRadiusRight,
												ChangeButtonColor(),
										  ]
										: [
												styles.ButtonStyle,
												styles.ButtonStyleRadiusRight,
										  ]
								}
								animation='fadeIn'
								delay={550}
								duration={2000}
							>
								<TouchableOpacity
									onPress={() => {
										this.setState({ buttonClicked: 3 });
									}}
								>
									<Animatable.Text
										animation='fadeIn'
										direction='alternate'
										delay={1050}
										duration={1500}
										style={styles.ButtonText}
									>
										Rating
									</Animatable.Text>
								</TouchableOpacity>
							</Animatable.View>
						</View>
						<Animatable.Text
							animation='fadeIn'
							delay={1000}
							duration={3000}
							style={styles.TypeOfFilter}
						>
							Cuisine
						</Animatable.Text>
						<View style={styles.ViewCuisine}>
							{[
								{ name: 'Burger' },
								{ name: 'Pizza' },
								{ name: 'Coffee' },
								{ name: 'Italian' },
								{ name: 'BBQ' },
								{ name: 'Chinese' },
								{ name: 'Pasta' },
								{ name: 'Fast Food' },
								{ name: 'Healthy' },
								{ name: 'International' },
								{ name: 'Sushi' },
								{ name: 'Mexican' },
							].map((e, i) => (
								<Animatable.View
									key={i}
									style={
										this.state.buttonCuisineClicked ===
										i + 1
											? [
													styles.ButtonsCuisineStyle,
													ChangeButtonCuisineColor(),
											  ]
											: styles.ButtonsCuisineStyle
									}
									animation='fadeIn'
									delay={1000}
									duration={2000}
								>
									<TouchableOpacity
										onPress={() => {
											this.setState({
												buttonCuisineClicked: i + 1,
											});
											this.setState({
												source: [...this.state.images][i],
											});
										}}
									>
										<Animatable.Text
											animation='fadeIn'
											direction='alternate'
											delay={1500}
											duration={1500}
											style={
												this.state.buttonCuisineClicked ===
												i + 1
													? [
															styles.ButtonsCuisineText,
															ChangeButtonCuisineText(),
													  ]
													: styles.ButtonsCuisineText
											}
										>
											{e.name}
										</Animatable.Text>
									</TouchableOpacity>
								</Animatable.View>
							))}
						</View>
						<Animatable.Text
							animation='fadeIn'
							duration={2200}
							delay={2000}
							style={styles.TypeOfFilter}
						>
							Location
						</Animatable.Text>
						<SearchBarLocation
							stateLocation={this.state.location}
							changeStateLocation={location =>
								this.setState({ location })
							}
						/>
					</View>
					<View
						style={[
							{
								height: this.SCREEN_HEIGHT * 0.4,
							},
							styles.ViewButtonFilter,
						]}
					>
						<TouchableOpacity
							onPress={() => {
								this.OnFilterClicked();
								this.props.navigation.goBack(null);
							}}
						>
							<Animatable.View
								animation='fadeIn'
								delay={2700}
								duration={2000}
								style={[
									{
										width: this.SCREEN_WIDTH * 0.9,
										marginBottom:
											Platform.OS === 'ios'
												? this.SCREEN_HEIGHT * 0.13
												: this.SCREEN_HEIGHT * 0.08,
									},
									styles.ButtonFilter,
								]}
							>
								<Animatable.Text
									animation='fadeIn'
									delay={3000}
									duration={1500}
									style={styles.ButtonFilterText}
								>
									Filter
								</Animatable.Text>
							</Animatable.View>
						</TouchableOpacity>
					</View>
				</View>
				{Platform.OS === 'ios' && (
					<StatusBar barStyle='light-content' />
				)}
			</View>
		);
	}
}

const ChangeButtonColor = () => ({
	...Platform.select({
		ios: {
			borderColor: 'white',
			borderWidth: 0.9,
		},
		android: {
			borderColor: 'white',
			borderWidth: 0.7,
		},
	}),
});

const ChangeButtonCuisineColor = function () {
	return {
		...Platform.select({
			ios: {
				borderColor: 'white',
				borderWidth: 0.9,
			},
			android: {
				borderColor: 'white',
				borderWidth: 0.7,
			},
		}),
	};
};
const ChangeButtonCuisineText = function () {
	return {
		fontSize: 13,
		fontWeight: '700',
	};
};

const styles = StyleSheet.create({
	//!General:
	View: { flex: 1, marginHorizontal: 15 },
	TypeOfFilter: {
		...Platform.select({
			ios: {
				marginTop: 16,
				marginBottom: 9,
			},
			android: {
				marginTop: 10,
				marginBottom: 4,
			},
		}),
		fontSize: 30,
		fontWeight: '400',
		color: 'white',
	},
	//!ButtonFilter
	ViewButtonFilter: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		position: 'relative',
	},
	ButtonFilter: {
		height: 50,
		marginHorizontal: 20,
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 1.3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ButtonFilterText: {
		color: 'white',
		fontSize: 22,
		fontWeight: '600',
	},
	//!Type:
	ViewButtonsStyle: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	ButtonStyle: {
		...Platform.select({
			ios: {
				borderWidth: 0.17,
				borderColor: 'rgba(255, 255, 255, 0.600)',
			},
			android: {
				borderWidth: 0.25,
				borderColor: 'rgba(255, 255, 255, 0.800)',
			},
		}),
		flex: 1,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ButtonStyleRadiusLeft: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	ButtonStyleRadiusRight: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	ButtonText: {
		color: 'white',
		fontSize: 16,
	},
	//!Cuisine ~ Kitchen
	ViewCuisine: {
		alignItems: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	ButtonsCuisineStyle: {
		...Platform.select({
			ios: {
				borderWidth: 0.17,
				borderColor: 'rgba(255, 255, 255, 0.600)',
			},
			android: {
				borderWidth: 0.25,
				borderColor: 'rgba(255, 255, 255, 0.800)',
			},
		}),
		borderRadius: 5,
		height: 35,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		marginBottom: 10,
	},
	ButtonsCuisineText: {
		fontSize: 12,
		color: 'white',
		fontWeight: '500',
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
});
const mapStateToProps = state => ({
	term: state.term.term,
	location: state.term.location,
	sort_by: state.term.sort_by,
});
export default connect(mapStateToProps, {
	termChanged,
	locationChanged,
	sortByChanged,
})(FilterScreen);
