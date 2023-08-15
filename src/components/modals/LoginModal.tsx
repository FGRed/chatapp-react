import React, {FC, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {logIn, userAlreadyLoggedIn} from "../../service/cuser/CUserService"
import {useDispatch} from "react-redux";
import {ReactNotifications} from 'react-notifications-component'
import {Store} from 'react-notifications-component';
import {showError, showSuccess} from "../notifications/GeneralNotifications";

interface LoginProps {
    show: boolean;
    onHide: () => void
}

interface LoginData {
    username: string;
    password: string;
}

const LoginModal: FC<LoginProps> = ({show, onHide}) => {

    const [loginData, setLoginData] = useState<LoginData>({username: "", password: ""})
    const dispatch = useDispatch()

    const onLogIn = async () => {
        const cuser = await logIn(loginData.username, loginData.password)
        if (cuser) {
            dispatch({type: "SET_USER", cuser: cuser})
            onHide()
            showSuccess("Log in success")
        } else {
            showError("Invalid username or password!")
        }
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
                        <input onChange={(e) => {
                            setLoginData({...loginData, username: e.target.value})
                        }} type="text" placeholder="Input username or email address" className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <input onChange={(e) => {
                            setLoginData({...loginData, password: e.target.value})
                        }} type="password" placeholder="password" className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col className="mx-auto">
                        <Button className="w-100" variant="primary" onClick={() => {
                            onLogIn()
                        }}>Login</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default LoginModal