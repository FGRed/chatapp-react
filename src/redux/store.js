import {combineReducers, createStore} from "redux"
import cuserReducer from "./profile/cuser-reducer";
import modalsReducer from "./modal/modalsReducer";
import dialogReducer from "./modal/dialogReducer";
import chatReducer from "./chat/chatReducer";
import navigationReducer from "./navigation/navigationReducer";
import imageCropperReducer from "./modal/imageCropperReducer";
import extraElementReducer from "./extra-element/extraElementReducer";

export default createStore(combineReducers(
    {cuserReducer, modalsReducer, dialogReducer, chatReducer, navigationReducer, imageCropperReducer, extraElementReducer}
))