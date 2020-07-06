import React from 'react';
import {
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const SearchBar = ({
	searchTerm,
	onTermChange,
	onTermSubmit,
	navigation,
	searchApi,
}) => (
	<Animatable.View
		style={styles.backgroundStyle}
		animation='fadeIn'
		duration={2000}
		delay={Platform.OS === 'android' ? 200 : 0}
	>
		<TouchableOpacity
			style={styles.iconStyle}
			onPress={onTermSubmit}
		>
			<Animatable.View
				animation='fadeIn'
				delay={200}
				duration={2000}
			>
				<Feather style={styles.iconStyle} name='search' />
			</Animatable.View>
		</TouchableOpacity>

		<Animatable.View
			animation='fadeIn'
			duration={2000}
			delay={400}
			style={{ flex: 1 }}
		>
			<TextInput
				style={styles.inputStyle}
				placeholder='NYC, Starbucks, Pizza, etc.'
				autoCapitalize='none'
				autoCorrect={false}
				value={searchTerm}
				onChangeText={onTermChange}
				onEndEditing={onTermSubmit}
			/>
		</Animatable.View>

		<TouchableOpacity
			style={[
				styles.iconStyle,
				{
					flex: 1,
					maxWidth: 40,
					marginRight: 15,
				},
			]}
			onPress={() =>
				navigation.navigate('Filter', { searchApi })
			}
		>
			<Animatable.View
				animation='fadeIn'
				duration={2000}
				delay={600}
			>
				<Ionicons
					style={styles.iconStyle}
					name='ios-options'
				/>
			</Animatable.View>
		</TouchableOpacity>
	</Animatable.View>
);

const styles = StyleSheet.create({
	ViewModalStyle: {
		flex: 1,
	},
	backgroundStyle: {
		flexDirection: 'row',
		backgroundColor: '#F0EEEE',
		height: 50,
		borderRadius: 10,
		marginHorizontal: 15,
		marginTop: 15,
	},
	inputStyle: {
		fontSize: 18,
		flex: 1,
		marginLeft: 5,
	},
	iconStyle: {
		fontSize: 30,
		alignSelf: 'center',
		paddingLeft: 5,
	},
});

export default SearchBar;
