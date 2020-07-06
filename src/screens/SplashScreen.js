import React, { Component } from 'react';
import {
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

class SplashScreen extends Component {
	constructor(props) {
		super(props);
		setTimeout(() => {
			props.setIsLoading(false);
		}, 2500);
	}
	render() {
		return (
			<LinearGradient
				colors={['#bebbe8', '#282d70', '#338696']}
				style={styles.viewStyle}
			>
				<Animatable.Text
					animation='fadeIn'
					duration={100}
					style={styles.textStyle}
				>
					Restaurant Search
				</Animatable.Text>
				<ActivityIndicator
					color='#282d70'
					size='large'
					style={styles.ActivityIndicatorStyle}
				/>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	viewStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStyle: {
		fontSize: 36,
		textAlign: 'center',
		color: 'white',
		opacity: 0.7,
	},
	ActivityIndicatorStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 100,
	},
});

export default SplashScreen;
