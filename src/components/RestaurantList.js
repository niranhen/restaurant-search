import React from 'react';
import {
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';

import RestaurantItem from '../components/RestaurantItem';

const RestaurantList = ({
	restaurantResults,
	navigation,
}) => (
	<View>
		<FlatList
			keyExtractor={result => result.id}
			data={restaurantResults}
			refreshing
			renderItem={({ item, index }) => (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('ItemExpanded', {
							id: item.id,
						})
					}
				>
					<RestaurantItem item={item} index={index} />
				</TouchableOpacity>
			)}
		/>
	</View>
);

export default RestaurantList;
