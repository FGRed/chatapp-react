import React, {ReactNode, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "../../css/view/main/MainChatPage.css"
import {Route, Routes, useNavigate} from "react-router";
import ChatView from "./ChatView";
import ChatsView from "./ChatsView";
import Contacts from "./Contacts";
import Settings from "./Settings";
import LoginModal from "../../modals/LoginModal";
import {useDispatch, useSelector} from "react-redux";
import CUser from "../../../model/cuser/CUser";
import {getCurrentSessionUser} from "../../../service/cuser/CUserService";
import axios from "axios";
import {showError, showWarning} from "../../notifications/GeneralNotifications";
import RegisterView from "../sign-in/RegisterView";
import SelectAvatar from "./avatar-crop/SelectAvatar";


const Navigation = () => {

    const [navButtons, setNavButtons] = useState<Array<ReactNode>>([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cuser = useSelector((state: any) => state.cuserReducer)
    const activeIndex: number = useSelector((state: any) => state.navigationReducer)

    const navButtonIcons = [
        {
            icon: "bi-chat-dots", redirect: () => {
                navigate("/chat")
            }, disabled: true
        },
        {
            icon: "bi-card-list", redirect: () => {
                navigate("/chats")
            }, disabled: false
        },
        {
            icon: "bi-people", redirect: () => {
                navigate("/contacts")
            }, disabled: false
        },
        {
            icon: "bi-gear", redirect: () => {
                navigate("/settings")
            }, disabled: false
        }
    ]

    const onClick = (i: number) => {
        dispatch({type: "SET_ACTIVE_INDEX", activeIndex: i})
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
        setNavButtons(navButtonIcons.map((navButtonIcon, i: number) => (
                <Col
                    className={`py-2 text-center main-chat-page--nav-col ${i === activeIndex ? "active": "passive " + (navButtonIcon.disabled && " enabled")} ${loggedIn ? "" : " enabled"}`}
                    onClick={() => {
                        if (loggedIn && !navButtonIcon.disabled) {
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
    const navigate = useNavigate()
    const activeIndex: number = useSelector((state: any) => state.navigationReducer)

    const cuser = useSelector((state: CUser) => state)

    const minSwipeDistance = 150

    const onTouchStart = (e: any) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const dispatch = useDispatch()
    useEffect(() => {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    showWarning("Session timeout. Please login again.")
                    dispatch({type: "RESET_USER"})
                    dispatch({type: "SET_ACTIVE_INDEX", activeIndex: 3})
                    showLoginModal(true)
                }
                return Promise.reject(error);
            }
        );
        console.log("Rendering main chat page")
    }, [])
    React.useEffect(() => {
        const getCurrentSessionUserAsync = async () => {
            const currentUser: CUser = await getCurrentSessionUser()
            if (currentUser) {
                dispatch({type: "SET_USER", cuser: currentUser})
                dispatch({type: "SET_ACTIVE_INDEX", activeIndex: 1})
                showLoginModal(false)
            } else {
                dispatch({type: "SET_ACTIVE_INDEX", activeIndex: 3})
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
                dispatch({type: "SET_ACTIVE_INDEX", activeIndex: activeIndex - 1})
            }
        }
        if (isLeftSwipe) {
            if (activeIndex + 1 < 4) {
                dispatch({type: "SET_ACTIVE_INDEX", activeIndex: activeIndex + 1})
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
        <Container fluid>
            <Row onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart}
                 className="justify-content-sm-center">
                <Col id="app-root" className="position-relative">
                    <Navigation/>
                    <Routes>
                        <Route element={<ChatView/>} path="/chat"/>
                        <Route element={<ChatsView/>} path="/chats"/>
                        <Route element={<Contacts/>} path="/contacts"/>
                        <Route element={<Settings/>} path="/settings"/>
                        <Route element={<RegisterView/>} path="/register"/>
                    </Routes>
                </Col>
            </Row>
            <LoginModal show={show} onHide={() => {
                showLoginModal(false)
            }}/>
            <SelectAvatar/>
        </Container>
    )
}

export default MainChatPage