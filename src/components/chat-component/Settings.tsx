import React, {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";
import UserInfoRibbon from "../user/UserInfoRibbon";
import "../css/chat-component/Settings.css"
import ListItem from "../css/misc/ListItem";
import {useDispatch, useSelector} from "react-redux";
import CUser from "../../model/cuser/CUser";
import {logout} from "../../service/cuser/CUserService";

const Settings = () => {

    const user: CUser = useSelector((state: any) => state.cuserReducer)
    const dispatch = useDispatch()

    const showLoginModal = (show: boolean) => {
        if (show) {
            dispatch({type: "SHOW_LOGIN_MODAL"})
        } else {
            dispatch({type: "HIDE_LOGIN_MODAL"})
        }
    }

    const onLogout = async () => {
        const cuser = await logout()
        dispatch({type: "SET_USER", cuser: cuser})
    }

    return (
        <Col md="auto">
            {user.id && <UserInfoRibbon user={user}/>}
            {user.id ?
                <div>
                    <ListItem settingName="Notifications" settingExplanation="Edit notifications" icon="bi-bell-fill"/>
                    <ListItem settingName="Contacts" settingExplanation="Block/Remove contacts"
                              icon="bi-person-lines-fill"/>
                    <ListItem settingName="Messages" settingExplanation="Edit message settings"
                              icon="bi-chat-dots-fill"/>
                    <ListItem settingName="State"
                              settingExplanation="Change account state. Put it on hold or remove it."
                              icon="bi-person-square"/>
                    <ListItem settingName="Password"
                              settingExplanation="Recover password" icon="bi-lock-fill"/>
                    <ListItem settingName="Logout" settingExplanation="Logout from the server" icon="bi-key-fill"
                              onClick={() => {
                                  onLogout()
                              }}/>
                </div>
                :
                <div>
                    <ListItem settingName="Log in" settingExplanation="Log in to the app" icon="bi-key" onClick={() => {
                        showLoginModal(true)
                    }}/>
                    <ListItem settingName="Sign in" settingExplanation="Sign in to the app"
                              icon="bi-box-arrow-in-right"/>
                    <ListItem settingName="Password"
                              settingExplanation="Recover password" icon="bi-lock-fill"/>
                </div>
            }
        </Col>
    )
}

export default Settings