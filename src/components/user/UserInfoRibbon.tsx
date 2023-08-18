import React, {createRef, FC, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import CUser from "../../model/cuser/CUser";
import {Col, Container, Ratio, Row, Spinner} from "react-bootstrap";
import Avatar from "./Avatar";
import "../css/user/UserInfoRibbon.css"
import {changeAvatar, setEmail, setUsername} from "../../service/cuser/CUserService";
import {Store} from "react-notifications-component";
import {fileToBase64} from "../util/FileUtil";
import ImageCompressor from "../util/ImageCompressor";
import {useNavigate} from "react-router";

interface PropType {
    user: CUser
}

const UserInfoRibbon: FC<PropType> = ({user}) => {

    const dispatch = useDispatch()
    const [showSpinner, setSHowSpinner] = useState(false)
    const navigate = useNavigate()

    const showNotification = (msg: string, type: any) => {
        Store.addNotification({
            message: msg,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
            }
        });
    }

    const saveEmail = async (email: string) => {
        const cuser = await setEmail(email)
        if (cuser) {
            dispatch({type: "SET_USER", cuser: cuser})
            showNotification("Email changed successfully.", "success")
        }
    }

    const saveUsername = async (username: string) => {
        const cuser = await setUsername(username)
        if (cuser) {
            dispatch({type: "SET_USER", cuser: cuser})
            showNotification("Email changed successfully.", "success")
        }
    }

    const inputFile: any = useRef()

    const onChooseFile = () => {
        if (inputFile.current) {
            inputFile.current.click()
        }
    }

    const onFileChange = async (evt: any) => {
        console.log("File changed")
        var file = evt.target.files[0];
        if (file.size < 20 * 1000 * 1000) {
            dispatch({type: "SHOW_IMAGE_CROPPER", selectedFile: file})
        } else {
            alert("Image file too large! Select a file under 20Mb.")
        }
        evt.target.value = null
    }

    const onEditCurrent = async () => {
        if(user.avatar){
            const file = ImageCompressor.base64ToFile("data:image/jpeg;base64,"+user.avatar, "test")
            dispatch({type:"SHOW_IMAGE_CROPPER", selectedFile: file})
        }

    }

    return (
        <div className="user-ribbon--wrapper p-3 border-bottom">
            <div className="left position-relative">
                <Avatar avatar={user?.avatar} variant="user-ribbon">
                    <div className="user-ribbon--change-avatar-btn" onClick={onChooseFile}>
                        <i className="bi bi-camera-fill"/>
                        <input accept="image/*" type='file' id='file' ref={inputFile} style={{display: 'none'}}
                               onChange={onFileChange}/>
                    </div>
                    <div className="user-ribbon--edit-current" onClick={onEditCurrent}>
                        <i className="bi bi-pencil-fill"/>
                    </div>
                    {showSpinner &&
                        <div className="user-ribbon--spinner">
                            <Spinner/>
                        </div>
                    }
                </Avatar>
            </div>
            <div className="right p-3">
                <Container className="g-0">
                    <RibbonCol value={user?.username} field="Username" editFunction={saveUsername}/>
                    <RibbonCol value={user?.email} field="Email" editFunction={saveEmail}/>
                    <RibbonCol value={user?.freeWord} field="Free word" editFunction={() => {
                    }}/>
                </Container>
            </div>
        </div>
    )
}

interface PropTypes {
    value: string | undefined,
    field: string | undefined,
    editFunction: (value: string) => void
}

const RibbonCol: FC<PropTypes> = ({value, field, editFunction}) => {

    const [edit, setEdit] = useState(false)
    const [userInput, setUserInput] = useState<string>("")
    const ref: any = createRef()

    return (
        <>
            <span className="text-secondary fw-bolder">{field}</span>
            <Row>
                <Col>
                    {!edit ?
                        <p>{value ? value : field + " not set"}
                            <a href="#!"
                               className="text-secondary"
                               onClick={() => {
                                   setEdit(true)
                               }}><i className="bi bi-pencil ps-2"/></a>
                        </p>
                        :
                        <div className="input-group mb-3">
                            <input onChange={(e) => {
                                setUserInput(e.target.value)
                            }} autoFocus ref={ref} className="form-control"
                                   placeholder={field && "Edit " + field.toLowerCase()}
                                   defaultValue={value}/>
                            <a href="#!" className="text-secondary input-group-text"
                               onClick={() => {
                                   editFunction(userInput)
                                   setEdit(false)
                               }}><i className="bi bi-check fs-5"/></a>
                            <a href="#!" className="text-secondary input-group-text"
                               onClick={() => {
                                   setEdit(false)
                               }}><i className="bi bi-x fs-5"/></a>
                        </div>
                    }
                </Col>
            </Row>
        </>
    )
}

const spinner = () => {

}


export default UserInfoRibbon