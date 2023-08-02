import React from "react";
import {Col, Row} from "react-bootstrap";
import "../css/chat-component/ChatView.css";

const ChatView = () => {

    return (
        <Row>
            <Col>
                <h2 className="no-content">No chat available</h2>
            </Col>
        </Row>
    )

}

export default ChatView