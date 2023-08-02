import React, {FC} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";

interface LoginProps {
    show: boolean;
    onHide: () => void
}

const LoginModal: FC<LoginProps> = ({show, onHide}) => {


    const logIn = async (username: string, password: string) => {
        const profile = await CUserService.logIn(username, password)
    }


    return (
        <Modal show={show} onHide={onHide} backdrop="static" centered closeButton>
            <Modal.Header closeButton className="border-0">

            </Modal.Header>
            <Modal.Body className="pt-1">
                <Row className="mb-3">
                    <Col sm="auto" className="mx-auto">
                        <h2>Login</h2>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <input type="text" placeholder="Username" className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <input type="password" placeholder="password" className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col className="mx-auto">
                        <Button className="w-100" variant="primary">Login</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default LoginModal