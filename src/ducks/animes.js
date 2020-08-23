import animeAPIGateway from '../gateways/animeGateway';

const animeGateway = new animeAPIGateway();
//Action types
const FETCH_ANIMES_START = 'FETCH_ANIMES_START';
const FETCH_NEXT_ANIMES_SUCCESS = 'FETCH_NEXT_ANIMES_SUCCESS';
const SEARCH_ANIMES_SUCCESS = 'SEARCH_ANIMES_SUCCESS';
const FETCH_ANIMES_FAILURE = 'FETCH_ANIMES_FAILURE';
//Action creators

export const fetchMoreAnimes = (params) => (dispatch) => {
  dispatch({
    type: FETCH_ANIMES_START,
    payload: {
      loading: true,
      params

    }
  });

  animeGateway.getAnimes(params)
  .then(animes =>
    dispatch({
      type: FETCH_NEXT_ANIMES_SUCCESS,
      payload: {
        animes: animes.results,
        lastPage: animes.last_page,
      }
    }))
    .catch(err=> {
      console.log(err);
      dispatch({
        type: FETCH_ANIMES_FAILURE,
        payload: {
          error: err
        }
      });
    })
};

export const searchAnimes = (params) => (dispatch) => {
  dispatch({
    type: FETCH_ANIMES_START,
    payload: {
      loading: true,
      params
    }
  });
  
  animeGateway.getAnimes(params)
  .then(animes =>
    dispatch({
      type: SEARCH_ANIMES_SUCCESS,
      payload: {
        animes: animes.results,
        lastPage: animes.last_page,
      }
    }))
    
};


const initialState = {
  animes: [],
  lastPage: 1,
  loading: false,
  url: ''
}
//reducer
const animeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANIMES_START:
      debugger;
      const { payload: { loading, params: { query, limit, page } } } = action;
      return {
        ...state,
        loading,
        url: `https://api.jikan.moe/v3/search/anime?q=${query}&limit=${limit}&page=${page}`
      }

    case SEARCH_ANIMES_SUCCESS:
      return {
        ...state,
        animes: [...action.payload.animes],
        lastPage: action.payload.lastPage,
        loading: false
      }

    case FETCH_NEXT_ANIMES_SUCCESS:
      return {
        ...state,
        animes: [
          ...state.animes,
          ...action.payload.animes
        ],
        lastPage: action.payload.lastPage,
        loading: false
      }
      case FETCH_ANIMES_FAILURE:
        return {
          ...state,
          animes: [],
          lastPage: 1,
          loading: false
        }
    default:
      return state;
  }
};

export default animeReducer;