import React, {FC, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {logIn} from "../../service/cuser/CUserService"
import {useDispatch} from "react-redux";
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';

interface LoginProps {
    show: boolean;
    onHide: () => void
}

interface LoginData {
    username: string;
    password: string;
}

const LoginModal: FC<LoginProps> = ({show, onHide}) => {

    const[loginData, setLoginData] = useState<LoginData>({username: "", password: ""})
    const dispatch = useDispatch()

    const onLogIn = async () => {
        const cuser = await logIn(loginData.username, loginData.password)
        if(cuser) {
            dispatch({type: "SET_USER", cuser: cuser})
            onHide()
            Store.addNotification({
                message: "Login successful",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                }
            });
        }else{
            Store.addNotification({
                title: "Error!",
                message: "Invalid username or password!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                }
            });
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
                        <input onChange={(e)=>{setLoginData({...loginData, username: e.target.value})}} type="text" placeholder="Username" className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <input onChange={(e)=>{setLoginData({...loginData, password: e.target.value})}} type="password" placeholder="password" className="form-control"/>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col className="mx-auto">
                        <Button className="w-100" variant="primary" onClick={()=>{onLogIn()}}>Login</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default LoginModal