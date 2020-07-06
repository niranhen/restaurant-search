import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { I18nManager } from 'react-native';
import SearchScreen from './src/screens/SearchScreen';
import FilterScreen from './src/screens/FilterScreen';
import ItemExpandedScreen from './src/screens/ItemExpanded';
import reducers from './src/reducers';

const navigator = createStackNavigator(
	{
		Search: {
			screen: SearchScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
		Filter: {
			screen: FilterScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
		ItemExpanded: {
			screen: ItemExpandedScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
	},
	{
		initialRouteName: 'Search',
	}
);

const App = createAppContainer(navigator);

export default () => {
	useEffect(() => {
		I18nManager.allowRTL(false);
		I18nManager.forceRTL(false);
	}, []);
	return (
		<Provider store={createStore(reducers)}>
			<App />
		</Provider>
	);
};
