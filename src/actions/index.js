import {
	TERM_CHANGED,
	LOCATION_CHANGED,
	SORT_BY_CHANGED,
} from './types';
export const termChanged = newTerm => ({
	type: TERM_CHANGED,
	payload: newTerm,
});

export const locationChanged = newLocation => ({
	type: LOCATION_CHANGED,
	payload: newLocation,
});

export const sortByChanged = newSort => ({
	type: SORT_BY_CHANGED,
	payload: newSort,
});
