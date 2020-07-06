import {
	TERM_CHANGED,
	LOCATION_CHANGED,
	SORT_BY_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
	term: ' Burger',
	location: ' NYC',
	sort_by: 'review_count',
};

export default (state = INITIAL_STATE, action) => {
	if (action.type === TERM_CHANGED) {
		return { ...state, term: action.payload };
	} else if (action.type === LOCATION_CHANGED) {
		return { ...state, location: action.payload };
	} else if (action.type === SORT_BY_CHANGED) {
		return { ...state, sort_by: action.payload };
	}
	return state;
};
