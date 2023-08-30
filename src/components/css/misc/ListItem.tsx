import React, {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";

interface ListItemProps {
    settingName: string,
    settingExplanation: string,
    icon: string,
    onClick?: () => void
}

const ListItem:FC<ListItemProps>=({settingName, settingExplanation, icon, onClick})=>{

    return(
        <div className="settings-button-wrapper border-bottom py-3" onClick={onClick}>
            <div className="settings-icon-col">
                <h1><i className={"bi " + icon}/></h1>
            </div>
            <div className="setting-content-col">
                    <Col>
                        <Row>
                            <Col><h4>{settingName}</h4></Col>
                        </Row>
                        <Row className="text-secondary">
                            <Col><p className="m-0">{settingExplanation}</p></Col>
                        </Row>
                    </Col>
            </div>
        </div>
    )
}

export default ListItem