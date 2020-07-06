import React from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
	TextInput,
	StyleSheet,
	Platform,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { locationChanged } from '../actions';

const SearchBarLocation = props => (
	<Animatable.View
		style={styles.backgroundStyle}
		animation='fadeIn'
		delay={2200}
		duration={2000}
	>
		<TextInput
			style={styles.inputStyle}
			placeholder='Search'
			placeholderTextColor={
				Platform.OS === 'android'
					? 'rgba(255, 255, 255, 0.800)'
					: 'rgba(255, 255, 255, 0.600)'
			}
			autoCapitalize='none'
			autoCorrect={false}
			value={props.stateLocation}
			onChangeText={props.changeStateLocation}
		/>
		<Animatable.View
			animation='fadeIn'
			duration={2000}
			delay={2600}
		>
			<EvilIcons style={styles.iconStyle} name='location' />
		</Animatable.View>
	</Animatable.View>
);

const styles = StyleSheet.create({
	backgroundStyle: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255, 255, 255, 0.0)',
		height: 50,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		...Platform.select({
			ios: {
				borderWidth: 0.5,
				borderColor: 'rgba(255, 255, 255, 0.550)',
			},
			android: {
				borderWidth: 0.6,
				borderColor: 'rgba(255, 255, 255, 0.750)',
			},
		}),
	},
	inputStyle: {
		fontSize: 18,
		flex: 1,
		marginLeft: 15,
		...Platform.select({
			ios: { color: 'rgba(255, 255, 255, 0.800)' },
			android: { color: 'white' },
		}),
	},
	iconStyle: {
		fontSize: 30,
		alignSelf: 'center',
		marginHorizontal: 10,
		...Platform.select({
			ios: { color: 'rgba(255, 255, 255, 0.550)' },
			android: { color: 'rgba(255, 255, 255, 0.750)' },
		}),
	},
});

const mapStateToProps = state => ({
	term: state.term.term,
	location: state.term.location,
});

export default connect(mapStateToProps, {
	locationChanged,
})(SearchBarLocation);
