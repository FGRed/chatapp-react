import {combineReducers, createStore} from "redux"
import cuserReducer from "./profile/cuser-reducer";
import modalsReducer from "./modal/modalsReducer";

export default createStore(combineReducers(
    {cuserReducer, modalsReducer}
))