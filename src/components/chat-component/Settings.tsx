import React, {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";
import UserInfoRibbon from "../user/UserInfoRibbon";
import "../css/chat-component/Settings.css"
import ListItem from "../css/misc/ListItem";
import {useSelector} from "react-redux";
import CUser from "../../model/cuser/CUser";

const Settings = () => {

    const user: CUser = useSelector((state: any) => state.cuserReducer)

    return (
        <Col md="auto" className="pt-5">
            {user.id > -1 && <UserInfoRibbon user={user}/>}
            {user.id > -1 ?
                <div>
                    <ListItem settingName="Notifications" settingExplanation="Edit notifications" icon="bi-bell-fill"/>
                    <ListItem settingName="Contacts" settingExplanation="Block/Remove contacts"
                              icon="bi-person-lines-fill"/>
                    <ListItem settingName="Messages" settingExplanation="Edit message settings"
                              icon="bi-chat-dots-fill"/>
                    <ListItem settingName="State"
                              settingExplanation="Change account state. Put it on hold or remove it."
                              icon="bi-person-square"/>
                    <ListItem settingName="Logout" settingExplanation="Logout from the server" icon="bi-key-fill"/>
                </div>
                :
                <div>
                    <ListItem settingName="Log in" settingExplanation="Log in to the app" icon="bi-key"/>
                    <ListItem settingName="Sign in" settingExplanation="Sign in to the app"
                              icon="bi-box-arrow-in-right"/>
                </div>
            }
        </Col>
    )
}

export default Settings