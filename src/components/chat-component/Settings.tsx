import React, {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";
import UserInfoRibbon from "../user/UserInfoRibbon";
import "../css/chat-component/Settings.css"
import ListItem from "../css/misc/ListItem";

const Settings=()=>{

    return(
        <Col md="auto" className="pt-5">
            <Row className="text-center">
                <h3>SETTINGS</h3>
            </Row>
            <UserInfoRibbon/>
            <div>
                <ListItem settingName="Notifications" settingExplanation="Edit notifications" icon="bi-bell-fill"/>
                <ListItem settingName="Contacts" settingExplanation="Block/Remove contacts" icon="bi-person-lines-fill"/>
                <ListItem settingName="Messages" settingExplanation="Edit message settings" icon="bi-chat-dots-fill"/>
                <ListItem settingName="State" settingExplanation="Change account state. Put it on hold or remove it." icon="bi-person-square"/>
                <ListItem settingName="Logout" settingExplanation="Logout from the server" icon="bi-key-fill"/>
            </div>
        </Col>
    )
}

export default Settings