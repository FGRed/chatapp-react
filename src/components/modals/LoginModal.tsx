import React, {FC, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {logIn} from "../../service/cuser/CUserService"
import {useDispatch} from "react-redux";
import {showSuccess} from "../notifications/GeneralNotifications";
import ResponseData from "../../model/response/ResponseData";
import {isCUser} from "../../model/cuser/CUser";

interface LoginProps {
    show: boolean;
    onHide: () => void
}

interface LoginData {
    username: string;
    password: string;
}

const isBoolean = (val:any) => 'boolean' === typeof val;

const LoginModal: FC<LoginProps> = ({show, onHide}) => {

    const [loginData, setLoginData] = useState<LoginData>({username: "", password: ""})
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const onLogIn = (logoutActive?:boolean | undefined) => {
        const loginAsync = async () => {
            return await logIn(loginData.username, loginData.password, logoutActive)
        }
        loginAsync().then((responseData: ResponseData) => {
            if (responseData.responseObject) {
                if(isCUser(responseData.responseObject)) {
                    dispatch({type: "SET_USER", cuser: responseData.responseObject})
                    onHide()
                    showSuccess(responseData.message)
                    setError("")
                }else if (isBoolean(responseData.responseObject)) {
                    dispatch({
                        type:"SET_DIALOG",
                        message:responseData.message,
                        title:"Warning",
                        acceptFunction:()=>{
                            onLogIn(true)
                        }
                    })
                }
            } else {
                setError(responseData.message)
            }
        })
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" centered>
            <Modal.Header closeButton className="border-0">

            </Modal.Header>
            <Modal.Body className="pt-1">
                <Row className="mb-3">
                    <Col sm="auto" className="mx-auto">
                        <h2>Login</h2>
                    </Col>
                </Row>
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
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
                        <button className="btn btn-primary w-100" onClick={() => {
                            onLogIn(false)
                        }}>Login</button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default LoginModal