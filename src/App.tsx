import React from 'react';
import MainChatPage from "./components/chat-component/MainChatPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/css/main.css"
import {Provider, useDispatch} from "react-redux";
import store from "./redux/store";
import 'react-notifications-component/dist/theme.css'
import {ReactNotifications} from "react-notifications-component";

function App() {



    return (
        <Provider store={store}>
            <ReactNotifications/>
            <MainChatPage/>
        </Provider>
    );
}

export default App;
