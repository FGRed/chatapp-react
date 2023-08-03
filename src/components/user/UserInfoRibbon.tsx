import React, {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CUser from "../../model/cuser/CUser";
import {Button, Col, Row} from "react-bootstrap";
import Avatar from "./Avatar";
import "../css/user/UserInfoRibbon.css"

const UserInfoRibbon=()=>{

    interface Edit{
        editUsername: boolean;
        editEmail: boolean;
    }

    const user = useSelector((state:any) => state.cuserReducer)
    const [edit, setEdit] = useState<Edit>({editUsername: false, editEmail: false})

    return(
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
                        <h1 className="m-0">{user?.username} <a href="#!" className="text-secondary" onClick={()=>{setEdit({...edit, editUsername: !edit.editUsername})}}>
                            <i className="bi bi-pencil fs-5"/>
                        </a>
                        </h1>
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
                                                                                   setEdit({
                                                                                       ...edit,
                                                                                       editEmail: !edit.editEmail
                                                                                   })
                                                                               }}><i className="bi bi-pencil fs-5"/></a>
                            </h1>
                            :
                            <>
                                <input className="form-control" placeholder="Edit username" defaultValue={user?.email}></input>
                                <a href="#!" className="text-secondary"
                                   onClick={() => {
                                       setEdit({
                                           ...edit,
                                           editEmail: !edit.editEmail
                                       })
                                   }}><i className="bi bi-pencil fs-5"/></a>
                            </>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}



export default UserInfoRibbon