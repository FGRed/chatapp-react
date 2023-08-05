import React, {FC, ReactNode, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "../css/chat-component/MainChatPage.css"
import {Route, Routes, useNavigate} from "react-router";
import ChatView from "./ChatView";
import ChatsView from "./ChatsView";
import Contacts from "./Contacts";
import Settings from "./Settings";
import LoginModal from "../modals/LoginModal";
import {useDispatch, useSelector} from "react-redux";
import CUser from "../../model/cuser/CUser";
import {getCurrentSessionUser} from "../../service/cuser/CUserService";

interface NavigationProps {
    activeIndex: number;
    setActiveIndex: (newIndex: number) => void;
}

const Navigation: FC<NavigationProps> = ({activeIndex, setActiveIndex}) => {

    const [navButtons, setNavButtons] = useState<Array<ReactNode>>([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cuser = useSelector((state:any) => state.cuserReducer)

    const navButtonIcons = [
        {
            icon: "bi-chat-dots", redirect: () => {
                navigate("/chat")
            }
        },
        {
            icon: "bi-card-list", redirect: () => {
                navigate("/chats")
            }
        },
        {
            icon: "bi-people", redirect: () => {
                navigate("/contacts")
            }
        },
        {
            icon: "bi-gear", redirect: () => {
                navigate("/settings")
            }
        }
    ]

    const onClick = (i: number) => {
        setActiveIndex(i)
    }

    const showLoginModal = (show: boolean) => {
        if (show) {
            dispatch({type: "SHOW_LOGIN_MODAL"})
        } else {
            dispatch({type: "HIDE_LOGIN_MODAL"})
        }
    }

    useEffect(() => {

        const loggedIn = cuser.id !== undefined && cuser.id !== null
        console.log(cuser)

        setNavButtons(navButtonIcons.map((navButtonIcon, i: number) => (
                <Col
                    className={`py-2 text-center main-chat-page--nav-col ${i === activeIndex ? "active" : "passive"} ${loggedIn ? "" : " enabled"}`}
                    onClick={() => {
                        if(loggedIn){
                            onClick(i);
                            navButtonIcon.redirect();
                        }
                    }}>
                    <i className={`bi ${navButtonIcon.icon} main-chat-page--nav-icon`}/>
                </Col>
            ))
        )
        showLoginModal(!loggedIn)

    }, [activeIndex, cuser])

    return (
        <Row className="main-chat-page--nav-col border-start border-end border-bottom">
            {navButtons}
        </Row>
    )
}

const MainChatPage = () => {

    const [touchStart, setTouchStart] = React.useState<number>(0)
    const [touchEnd, setTouchEnd] = React.useState<number>(0)
    const [activeIndex, setActiveIndex] = React.useState<number>(2)
    const navigate = useNavigate()

    const cuser = useSelector((state: CUser) => state)

    const minSwipeDistance = 150

    const onTouchStart = (e: any) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
    }


    const dispatch = useDispatch()

    React.useEffect(() => {
        const getCurrentSessionUserAsync = async () => {
            const currentUser: CUser = await getCurrentSessionUser()
            if (currentUser) {
                dispatch({type: "SET_USER", cuser: currentUser})
                showLoginModal(false)
            } else {
                setActiveIndex(3)
                showLoginModal(true)
            }
        }
        getCurrentSessionUserAsync()
    }, [])

    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance: number = (touchStart - touchEnd)
        const isLeftSwipe: boolean = distance > minSwipeDistance
        const isRightSwipe: boolean = distance < -minSwipeDistance
        if (isRightSwipe) {
            if (activeIndex - 1 > -1) {
                setActiveIndex(activeIndex - 1)
            }
        }
        if (isLeftSwipe) {
            if (activeIndex + 1 < 4) {
                setActiveIndex(activeIndex + 1)
            }
        }
    }

    const showLoginModal = (show: boolean) => {
        if (show) {
            dispatch({type: "SHOW_LOGIN_MODAL"})
        } else {
            dispatch({type: "HIDE_LOGIN_MODAL"})
        }

    }

    useEffect(() => {
        if (activeIndex === 0) {
            navigate("/chat")
        } else if (activeIndex === 1) {
            navigate("/chats")
        } else if (activeIndex === 2) {
            navigate("/contacts")
        } else if (activeIndex === 3) {
            navigate("/settings")
        }
    }, [activeIndex])


    const show: boolean = useSelector((state: any) => state.modalsReducer.showLoginModal)

    return (
        <Container fluid="lg">
            <Row onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart}
                 className="justify-content-md-center">
                <Col id="app-root" className="position-relative">
                    <Navigation setActiveIndex={setActiveIndex} activeIndex={activeIndex}/>
                    <Routes>
                        <Route element={<ChatView/>} path="/chat"/>
                        <Route element={<ChatsView/>} path="/chats"/>
                        <Route element={<Contacts/>} path="/contacts"/>
                        <Route element={<Settings/>} path="/settings"/>
                    </Routes>
                </Col>
            </Row>
            <LoginModal show={show} onHide={() => {
                showLoginModal(false)
            }}/>
        </Container>
    )
}

export default MainChatPage