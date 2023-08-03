import React, {createRef, FC, useState} from "react";
import {useDispatch} from "react-redux";
import CUser from "../../model/cuser/CUser";
import {Col, Row} from "react-bootstrap";
import Avatar from "./Avatar";
import "../css/user/UserInfoRibbon.css"
import {setEmail, setUsername} from "../../service/cuser/CUserService";
import {Store} from "react-notifications-component";


interface PropType  {
    user: CUser
}

const UserInfoRibbon:FC<PropType> = ({user}) => {

    interface Edit {
        editUsername: boolean;
        editEmail: boolean;
    }

    interface UserInput{
        email: string;
        username: string;
        avatar: string;
    }

    const [edit, setEdit] = useState<Edit>({editUsername: false, editEmail: false})
    const editUsernameRef = createRef<HTMLInputElement>()
    const editEmailRef = createRef<HTMLInputElement>()
    const [userInput, setUserInput] = useState<UserInput>({email: "", username:"", avatar: ""})
    const dispatch = useDispatch()

    const toggleEditMode = (inputName: string) => {
        if (inputName === 'username') {
            setEdit({
                ...edit,
                editUsername: !edit.editUsername
            })
        } else {
            setEdit({
                ...edit,
                editEmail: !edit.editEmail
            })
        }
    }


    const showNotification=(msg:string)=>{
        Store.addNotification({
            message: msg,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
            }
        });
    }


    const saveData = async (type:string)=>{
        if(type === 'username'){
            const cuser = await setUsername(userInput.username)
            if(cuser) {
                dispatch({type:"SET_USER", cuser:cuser})
                setEdit({...edit, editUsername: false })
                showNotification("Username changed successfully.")
            }
        }else{
            const cuser = await setEmail(userInput.email)
            if(cuser) {
                dispatch({type:"SET_USER", cuser:cuser})
                setEdit({...edit, editEmail: false })
                showNotification("Email changed successfully.")
            }
        }
    }


    return (
        <Row className="p-5 border-bottom">
            <Col sm="4" className="mb-3">
                <Avatar avatar={user?.avatar}/>
            </Col>
            <Col sm="auto" className="pt-3">
                <Row>
                    <Col sm="auto">
                        <h5 className="text-secondary">Username <a href="#!" className="text-secondary"></a></h5>
                    </Col>
                </Row>
                <Row className="mb-2 g-2">
                    <Col sm="auto">
                        {!edit?.editUsername ?
                            <h1 className="m-0">{user?.username} <a href="#!" className="text-secondary"
                                                                    onClick={() => {
                                                                        toggleEditMode('username')
                                                                    }}>
                                <i className="bi bi-pencil fs-5"/>
                            </a>
                            </h1>
                            :
                            <div className="input-group mb-3">
                                <input onChange={(e)=>{setUserInput({...userInput, username: e.target.value})}} autoFocus ref={editUsernameRef} className="form-control" placeholder="Edit username"
                                       defaultValue={user?.username}/>
                                <a href="#!" className="text-secondary input-group-text"
                                   onClick={() => {
                                       saveData('username')
                                   }}><i className="bi bi-check fs-5"/></a>
                                <a href="#!" className="text-secondary input-group-text"
                                   onClick={() => {
                                       toggleEditMode('username')
                                   }}><i className="bi bi-x fs-5"/></a>
                            </div>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col sm="auto">
                        <h5 className="text-secondary">Email</h5>
                    </Col>
                </Row>
                <Row className="g-2">
                    <Col sm="auto">
                        {!edit?.editEmail ?
                            <h1>{user.email ? user.email : "Email not set"} <a href="#!" className="text-secondary"
                                                                               onClick={() => {
                                                                                   toggleEditMode('email')
                                                                               }}><i className="bi bi-pencil fs-5"/></a>
                            </h1>
                            :
                            <div className="input-group mb-3">
                                <input onChange={(e)=>{setUserInput({...userInput, email: e.target.value})}} autoFocus ref={editEmailRef} className="form-control" placeholder="Edit email"
                                       defaultValue={user?.email}/>
                                <a href="#!" className="text-secondary input-group-text"
                                   onClick={() => {
                                       saveData('email')
                                   }}><i className="bi bi-check fs-5"/></a>
                                <a href="#!" className="text-secondary input-group-text"
                                   onClick={() => {
                                       toggleEditMode('email')
                                   }}><i className="bi bi-x fs-5"/></a>
                            </div>

                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}


export default UserInfoRibbon