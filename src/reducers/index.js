import { combineReducers } from "redux";
import gameStateReducer from "./gameState";

export default combineReducers({
    gameState: gameStateReducer
});