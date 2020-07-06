import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Platform,
	StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import SearchBar from '../components/SearchBar';
import useRestaurantResults from '../hooks/useRestaurantResults';
import RestaurantList from '../components/RestaurantList';
import {
	termChanged,
	locationChanged,
	sortByChanged,
} from '../actions';
import SplashScreen from './SplashScreen';

const SearchScreen = props => {
	const [searchTerm, setSearchTerm] = useState('');
	const [
		searchApi,
		restaurantResults,
		errorMessage,
	] = useRestaurantResults();
	const [isLoading, setIsLoading] = useState(true);

	const SCREEN_HEIGHT = Dimensions.get('window').height;

	const onTermChanged = newTerm => {
		props.termChanged(newTerm);
	};

	if (isLoading) {
		return <SplashScreen setIsLoading={setIsLoading} />;
	}
	return (
		<View
			style={{
				flex: 1,
				marginTop: SCREEN_HEIGHT * 0.055,
			}}
		>
			<Text style={styles.titleStyle}>
				Restaurant Search
			</Text>
			<View style={styles.line} />

			<SearchBar
				searchTerm={searchTerm}
				onTermSubmit={() => {
					searchApi(
						searchTerm,
						props.location,
						props.sort_by
					);
					onTermChanged(searchTerm);
				}}
				onTermChange={setSearchTerm}
				navigation={props.navigation}
				searchApi={searchApi}
			/>

			{errorMessage ? (
				<Animatable.Text
					animation='fadeIn'
					duration={1500}
					delay={400}
					style={styles.errorOrTotalMsg}
				>
					{errorMessage}
				</Animatable.Text>
			) : (
				<Animatable.Text
					animation='fadeIn'
					duration={1500}
					delay={400}
					style={styles.errorOrTotalMsg}
				>
					Total restaurants: 8228
				</Animatable.Text>
			)}

			<RestaurantList
				restaurantResults={restaurantResults}
				navigation={props.navigation}
			/>
			{Platform.OS === 'ios' && (
				<StatusBar barStyle='dark-content' />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		fontSize: 20,
		textAlign: 'center',
	},
	line: {
		...Platform.select({
			ios: { borderWidth: 0.4 },
			android: { borderWidth: 0.25 },
		}),
		marginTop: 10,
		borderColor: 'gray',
		borderRadius: 1,
		marginHorizontal: 5,
		opacity: 0.1,
	},
	errorOrTotalMsg: {
		fontSize: 14,
		marginHorizontal: 15,
		color: 'gray',
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
})(SearchScreen);
