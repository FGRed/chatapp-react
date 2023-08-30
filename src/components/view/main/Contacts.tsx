import React, {FC, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "../../css/view/main/Contacts.css";
import Avatar from "../../user/Avatar";
import CUser from "../../../model/cuser/CUser";
import Contact from "../../../model/contact/Contact";
import {getCurrentSessionContacts} from "../../../service/contact/ContactService";

const Contacts = () => {


    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        const getContactsAsync = async () => {
            const contactsRes = await getCurrentSessionContacts()
            setContacts(contactsRes)
            console.log(contactsRes)
        }
        getContactsAsync()
        console.log("Opening contacts...")
    }, [])


    return (
        <Row>
            {!contacts &&
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
            }
            {contacts && contacts.map(contact => (
                <ContactListItem username={contact.contactUser.username} avatar={contact.contactUser.avatar}/>
            ))}
        </Row>
    )

}

const AddContact = () => {

    const [users, setUsers] = useState<CUser[]>([])

    useEffect(() => {

    }, [])

    return (
        <Row>
            <Col>
                {
                    users && users.map((user: CUser) => (
                        <ContactListItem username={user.username} avatar={user.avatar}/>
                    ))
                }
            </Col>
        </Row>
    )
}


const ContactListItem: FC<CUser> = ({avatar, username}) => {
    return (
        <div className="contact--contact-list-item p-3 border-bottom">
            <div className="left position-relative">
                <Avatar avatar={avatar}/>
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