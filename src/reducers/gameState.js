import { SET_GAME_STATE } from '../actions/gameState';

const initialState = {
    gameID: 0,
    category: '',
    encodedPhrase: '',
    failsCounter: 0,
    endState: null,
};

const gameStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAME_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default: return state;
    }
};

export default gameStateReducer;
