import { useState, useEffect } from 'react';

import yelp from '../api/yelp';

export default () => {
	const [
		restaurantResults,
		setRestaurantResults,
	] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const searchApi = async (term, location, sort_by) => {
		if (location === '') {
			location = 'NYC';
		}
		try {
			const response = await yelp.get('/search', {
				params: {
					sort_by,
					location,
					term,
				},
			});
			console.log('response:', response);
			setRestaurantResults(response.data.businesses);
		} catch (e) {
			setErrorMessage('Something went wrong');
		}
	};

	useEffect(() => {
		searchApi(' Burger', 'NYC');
	}, []);

	return [searchApi, restaurantResults, errorMessage];
};
