//Action types
const FETCH_ANIMES = "FETCH_ANIMES"

//Action creators

export const fetchAnimes = ({query, limit, page}) => (dispatch) => {
	fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&limit=${limit}&page=${page}`)
		.then(res => res.json())
		.then(animes => dispatch({
			type: FETCH_ANIMES,
			payload: animes.results
		}));
}

//reducer
const animeReducer = (state = { animes: [] }, action) => {
	switch (action.type) {
		case FETCH_ANIMES:
			return [
				...state,
				...action.payload,
			]
		default:
			return state;
	}
};

export default animeReducer;