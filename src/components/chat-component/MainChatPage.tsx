import React, {FC, ReactNode, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "../css/chat-component/MainChatPage.css"
import {Route, Routes, useNavigate} from "react-router";
import ChatView from "./ChatView";
import ChatsView from "./ChatsView";
import Contacts from "./Contacts";
import Settings from "../css/chat-component/Settings";
import LoginModal from "../modals/LoginModal";

interface NavigationProps {
    activeIndex: number;
    setActiveIndex: (newIndex: number) => void;
}

const Navigation: FC<NavigationProps> = ({activeIndex, setActiveIndex}) => {

    const [navButtons, setNavButtons] = useState<Array<ReactNode>>([])
    const navigate = useNavigate()

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
                navigate("/contacts")
            }
        }
    ]

    const onClick = (i: number) => {
        setActiveIndex(i)
    }

    useEffect(() => {
        setNavButtons(navButtonIcons.map((navButtonIcon, i: number) => (
                <Col
                    className={`py-2 text-center main-chat-page--nav-col ${i === activeIndex ? "active" : "passive"}`}
                    onClick={() => {
                        onClick(i);
                        navButtonIcon.redirect();
                    }}>
                    <i className={`bi ${navButtonIcon.icon} main-chat-page--nav-icon`}/>
                </Col>
            ))
        )

    }, [activeIndex])

    return (
        <Row className="main-chat-page--nav-col border-bottom">
            {navButtons}
        </Row>
    )
}

const MainChatPage = () => {

    const [touchStart, setTouchStart] = React.useState<number>(0)
    const [touchEnd, setTouchEnd] = React.useState<number>(0)
    const [activeIndex, setActiveIndex] = React.useState<number>(2)
    const navigate = useNavigate()

    const minSwipeDistance = 150

    const onTouchStart = (e: any) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
    }

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

    useEffect(() => {
        if (activeIndex === 0) {
            navigate("/chat")
        } else if (activeIndex === 1) {
            navigate("/chats")
        } else if (activeIndex === 2) {
            navigate("/contacts")
        }else if (activeIndex === 3) {
            navigate("/settings")
        }
    }, [activeIndex])


    const [show, setShow] = useState(true)

    return (
        <Container fluid="lg">
            <Row onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart}
                 className="justify-content-md-center">
                <Col id="app-root" className="border position-relative">
                    <Navigation setActiveIndex={setActiveIndex} activeIndex={activeIndex}/>
                    <Routes>
                        <Route element={<ChatView/>} path="/chat"/>
                        <Route element={<ChatsView/>} path="/chats"/>
                        <Route element={<Contacts/>} path="/contacts"/>
                        <Route element={<Settings/>} path="/settings"/>
                    </Routes>
                </Col>
            </Row>
            <LoginModal show={show} onHide={()=>{setShow(false)}}/>
        </Container>
    )
}

export default MainChatPage