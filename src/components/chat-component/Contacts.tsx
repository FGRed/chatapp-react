import React from "react";
import {Col, Row} from "react-bootstrap";
import "../css/chat-component/Contacts.css";

const Contacts = () => {

    return (
        <Row>
            <Col className="no-content">
                <Row className="text-center">
                    <Col>
                        <h2>No contacts available. </h2>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <h2>You can add them from <a href="#!">here.</a> </h2>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

export default Contacts