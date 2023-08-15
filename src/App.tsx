import React from 'react';
import MainChatPage from "./components/view/main/MainChatPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/css/main.css"
import {Provider} from "react-redux";
import store from "./redux/store";
import 'react-notifications-component/dist/theme.css'
import {ReactNotifications} from "react-notifications-component";
import Dialog from "./components/modals/Dialog";

function App() {

    return (
        <Provider store={store}>
            <ReactNotifications/>
            <MainChatPage/>
            <Dialog/>
        </Provider>
    );
}

export default App;
