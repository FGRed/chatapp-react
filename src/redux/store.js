import {combineReducers, createStore} from "redux"
import cuserReducer from "./profile/cuser-reducer";

export default createStore(combineReducers(
    {cuserReducer}
))