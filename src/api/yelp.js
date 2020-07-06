import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.yelp.com/v3/businesses',
	headers: {
		Authorization:
			'Bearer TeFt8TBFQWwSsFTGvPTM-RqWpYa5FUvV7L6Wvk5F2RwSp3QN_AIoi2_N6RhQ_eJczgdIIkDek_2zC2if57ZtM0Y_lV3TSzO9jB0ljqOxYPRlPZBTq5m1GrwBK3TyXXYx',
	},
});
