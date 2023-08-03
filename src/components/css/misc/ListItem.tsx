import React, {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Settings from "../../chat-component/Settings";

interface ListItemProps{
    settingName: string,
    settingExplanation: string,
    icon: string
}

const ListItem:FC<ListItemProps>=({settingName, settingExplanation, icon})=>{

    return(
        <div className="settings-button-wrapper border-bottom py-3">
            <div className="settings-icon-col">
                <h1><i className={"bi " + icon}/></h1>
            </div>
            <div className="setting-content-col">
                <Container>
                    <Col>
                        <Row>
                            <Col><h4>{settingName}</h4></Col>
                        </Row>
                        <Row className="text-secondary">
                            <Col><p className="m-0">{settingExplanation}</p></Col>
                        </Row>
                    </Col>
                </Container>

            </div>
        </div>
    )
}

export default ListItem