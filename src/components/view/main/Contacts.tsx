import React, {FC, useEffect, useState} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import "../../css/view/main/Contacts.css";
import Avatar from "../../user/Avatar";
import CUser from "../../../model/cuser/CUser";

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
                        <h2>You can add them from <a href="src/components/view/main/Contacts#!">here.</a></h2>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

const AddContact = () => {

    const[users, setUsers]= useState<CUser[]>([])

    useEffect(()=>{

    }, [])

    return (
        <Row>
            <Col>
                {
                    users && users.map((user:CUser)=>(
                        <ContactListItem username={user.username} avatar={user.avatar}/>
                    ))
                }
            </Col>
        </Row>
    )
}


const ContactListItem: FC<CUser> = ({avatar, username}) => {
    return (
        <div className="contact-list-item p-3 border-bottom">
            <div className="left position-relative">
                <Avatar avatar={avatar} variant="user-ribbon"/>
            </div>
            <div className="right p-3">
                <Container className="g-0">
                    <Row>
                        <Col><h5>{username}</h5></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

Contacts.addContact = AddContact


export default Contacts