import React, {FC, useEffect, useState} from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import "../../css/view/main/Contacts.css";
import CUser from "../../../model/cuser/CUser";
import Contact from "../../../model/contact/Contact";
import {addContact, contactExists, getCurrentSessionContacts} from "../../../service/contact/ContactService";
import GeneralUserItem from "../../user/GeneralUserItem";
import {hideDialog, showDialog} from "../../dialog/Dialog";
import {createChat, exists} from "../../../service/chat/ChatService";
import Chat from "../../../model/chat/Chat";
import {useDispatch, useSelector} from "react-redux";
import {find, getUsersList} from "../../../service/cuser/CUserService";

const Contacts = () => {

    const [contacts, setContacts] = useState<Contact[]>([])
    const d = useDispatch()
    const cuser = useSelector((state: any) => state.cuserReducer)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const getContactsAsync = async () => {
            const contactsRes = await getCurrentSessionContacts()
            setContacts(contactsRes)
        }
        getContactsAsync()
    }, [])

    const onStartChat = (user: CUser) => {
        const existsAsync = async () => {
            return await exists([user.id, cuser.id])
        }
        existsAsync().then((exists: Chat) => {
            if (!exists) {
                const createChatAsync = async () => {
                    if (user?.id) {
                        return createChat([user.id])
                    }
                }
                showDialog("Do you want to start a chat with " + user.username + "?", "Notification", () => {
                    createChatAsync().then((chat: Chat) => {
                        d({type: "SET_CHAT", chat: chat})
                        d({type: "SET_ACTIVE_INDEX", activeIndex: 0})
                        hideDialog()
                    })
                })
            } else {
                d({type: "SET_CHAT", chat: exists})
                d({type: "SET_ACTIVE_INDEX", activeIndex: 0})
            }
        })

    }
    return (
        <Container fluid className="g-0">
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
            {contacts &&
                <div className="row g-0 bg-foreground border">
                    <div className="col-auto ms-auto p-2">
                        <button className="btn btn-outline-primary" onClick={() => {
                            setShow(true)
                        }}><i className="bi bi-person-add"/></button>
                    </div>
                </div>
            }

            {contacts && contacts.map(contact => (
                <GeneralUserItem user={contact.contactUser} onClick={() => {
                    onStartChat(contact.contactUser)
                }}/>
            ))}
            <AddContact setContacts={setContacts} show={show} onHide={() => {
                setShow(false)
            }}/>
        </Container>
    )

}


interface Props {
    show: boolean,
    onHide: () => void,
    setContacts: (contact: any) => void
}

const AddContact: FC<Props> = ({show, onHide, setContacts}) => {

    const [users, setUsers] = useState<CUser[]>([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            const findAsync = async () => {
                return await find(event.target.value)
            }
            findAsync().then(foundUsers => {
                setUsers(foundUsers)
            })
        } else {
            getAllUsers()
        }
    }

    const getAllUsers = () => {
        const getUsersAsync = async () => {
            return await getUsersList()
        }
        getUsersAsync().then(users => setUsers(users))
    }

    const onClick = (user: CUser | undefined) => {
        const addContactAsync = async () => {
            return await addContact(user?.id)
        }
        const contactExistsAs = async () => {
            return await contactExists(user?.id)
        }
        contactExistsAs().then(exists => {
            if (!exists) {
                showDialog(`Do you want to add ${user?.username} to contacts?`, "Warning", () => {
                    addContactAsync().then((contact: Contact) => {
                        setContacts((prevState: Contact[]) => [...prevState, contact])
                        hideDialog()
                        onHide()
                    })
                })
            } else {
                alert("User already in contacts!")
            }
        })

    }

    return (
        <Modal centered backdrop="static" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                Add contact <i className="ms-2 bi bi-person-add"/>
            </Modal.Header>
            <Modal.Body className="bg-main">
                <Row>
                    <Col className="position-relative">
                        <input autoFocus className="form-control mb-2" onChange={onChange} placeholder="Search..."/>
                        <i className="bi bi-search position-absolute" style={{bottom: "16px", right: "25px"}}/>
                    </Col>
                </Row>
                <Row className="users-row">
                    <Col>
                        {
                            users && users.map((user: CUser) => (
                                <GeneralUserItem user={user} onClick={() => {
                                    onClick(user)
                                }}/>
                            ))
                        }
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}


Contacts.addContact = AddContact


export default Contacts