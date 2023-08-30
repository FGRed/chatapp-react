import React, {useEffect, useRef, useState} from "react";
import {Col, Spinner} from "react-bootstrap";
import "../../css/view/main/ChatView.css";
import ChatMessageComponent from "../../chat/ChatMessageComponent";
import {useDispatch, useSelector} from "react-redux";
import ChatMessage, {ChatMessageDTO} from "../../../model/chat/ChatMessage";
import {getChatsMessages, sendMessage} from "../../../service/chat/ChatService";
import Chat from "../../../model/chat/Chat";
import CUser from "../../../model/cuser/CUser";
import {isMobile} from 'react-device-detect'
// @ts-ignore
import SockJsClient from 'react-stomp';
import FadeIn from "react-fade-in";
import useSound from "use-sound"
// @ts-ignore
import notif from "../../../sound/notif.mp3"
import ChatsComponent from "../../chat/ChatsComponent";
import EmojiSelector from "../../emoji/EmojiSelector";


const ChatView = () => {

    const chat: Chat = useSelector((state: any) => state.chatReducer)
    const cuser: CUser = useSelector((state: any) => state.cuserReducer)
    const [chatMessages, setChatMessages]: any = useState<any>([])
    const [showSpinner, setShowSpinner] = useState(true)
    const [position, setPosition] = useState("position-absolute")
    const [chatMessage, setChatMessage] = useState<ChatMessageDTO>({receiverId: -1, text: "", chatId: ""})
    const inputRef: any = useRef()
    const [playSound] = useSound(notif)
    const [socketConnected, setSocketConnected] = useState(false)
    const [loadTime, setLoadTime] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        let receiverId: number | undefined
        chat.chatParticipants.forEach(p => {
                if (p.id !== cuser.id) {
                    receiverId = p.id
                    return
                }
            }
        )

        setChatMessage({
            receiverId: receiverId,
            chatId: chat.id,
            text: ""
        })
        dispatch({type: "SET_ELEMENT", element: <ChatsComponent chat={chat} className="border"/>})
        return () => {
            window.clearInterval(interval.current)
            dispatch({type: "SET_ELEMENT", element: undefined})
        }
    }, [chat])

    let interval: any = useRef()

    const updateTime = () => {
        setLoadTime(prevCount => prevCount + 1)
        interval.current = window.setInterval(() => {
            setLoadTime(prevCount => prevCount + 1)
            console.log(interval)
        }, 1000)
    }

    useEffect(() => {
        if (showSpinner) {
            updateTime()
        } else {
            window.clearInterval(interval.current)
            setLoadTime(0)
        }
    }, [showSpinner])

    useEffect(() => {
        setShowSpinner(true)
        const getChatMessagesAync = async () => {
            const messages = await getChatsMessages(chat.id)
            setChatMessages(messages)
            setShowSpinner(false)
        }
        getChatMessagesAync()
    }, [])

    useEffect(() => {
        const root = document.getElementById("app-root")
        if (elementOverflows(root)) {
            if (isMobile) {
                setPosition("position-fixed")
            } else {
                setPosition("position-sticky")
            }

        } else {
            setPosition("position-absolute")
        }
        scrollToBottom()

    }, [chatMessages])

    const sendMsg = async () => {
        if (socketConnected) {
            if (chatMessage.receiverId === -1) {
                alert("Something went wrong!")
                console.log(chatMessage)
                return
            }
            await sendMessage(chatMessage)
            if (inputRef.current) {
                inputRef.current.value = ""
                setChatMessage({...chatMessage, text: ""})
            }
        } else {
            alert("Establishing connection to user. This can take from several seconds to a minute. Please be patient and try again")
        }

    }

    const onKeyPress = (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            sendMsg()
        }
    }

    const addMsg = (msg: any) => {
        setChatMessages((prevItems: any) => [...prevItems, msg]);
        //playSound()
    }

    const scrollToBottom = () => {
        const root = document.getElementById("app-root")
        if (root) {
            root.scrollTop = root.scrollHeight;
        }
    };

    const elementOverflows = (element: HTMLElement | null) => {
        if (element) {
            return element.offsetHeight < element.scrollHeight;
        }
    }

    const [show, setShow] = useState(false)

    const [emoji, setEmoji] = useState("")

    useEffect(() => {
        if (chatMessage.receiverId !== -1) {

            if (chatMessage.text && chatMessage?.text.length > 200) {
                alert("Max message limit met.")
                return
            }

            setChatMessage({...chatMessage, text: chatMessage.text + emoji})
            inputRef.current.value = chatMessage.text + emoji
            inputRef.current.focus()
        }
    }, [emoji])

    useEffect(() => {
        const hideEmojiSelect = () => setShow(false)
        var root = document.getElementById("app-root")
        if (show) {
            root?.addEventListener("click", hideEmojiSelect)
        } else {
            root?.removeEventListener("click", hideEmojiSelect)
        }
    }, [show])

    const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value.length < 202) {
            setChatMessage({...chatMessage, text: evt.target.value})
        } else {
            alert("Max message size of 200 characters met. ")
        }
    }

    return (
        <>
            {chatMessages &&
                <>
                    <SockJsClient
                        url="/api/ws"
                        topics={['/topic/message']}
                        heartbeat={100}
                        onMessage={(chatMessage: any) => addMsg(chatMessage)}
                        onConnect={() => {
                            setSocketConnected(true)
                            console.info("Socket connected to topic: messages")
                        }}
                        onDisconnect={() => {
                            setSocketConnected(false)
                            console.log("Disconnected socket from topic: messages")
                        }}
                    />
                    <SockJsClient
                        url="/api/ws"
                        topics={['/topic/unread']}
                        heartbeat={100}
                        onMessage={(unread: any) => console.log("Unread")}
                        onConnect={() => {
                            setSocketConnected(true)
                            console.info("Socket connected to topic: unread")
                        }}
                        onDisconnect={() => {
                            setSocketConnected(false)
                            console.log("Disconnected socket from topic: unread")
                        }}
                    />
                </>
            }
            <div className={"container-fluid g-0 " + (isMobile ? " mobile-view" : "")}
                 style={{maxWidth: "800px"}}>
                <Col ref={inputRef} md="auto" className="p-2 px-3">
                    {showSpinner &&
                        <div className="no-content">
                            <Spinner size="sm" className="me-2"/>
                            <span>Loading messages. Please wait... {loadTime}s</span>
                        </div>
                    }
                    <FadeIn childClassName="div" delay={0.5}>
                        {chatMessages && chatMessages.map((m: ChatMessage) => (
                            <div className="row g-0">
                                <div className="col">
                                    <ChatMessageComponent fromMe={m.sender.id === cuser.id} message={m}/>
                                </div>
                            </div>
                        ))}
                    </FadeIn>
                </Col>
                <div className={"border container-fluid chat-field g-0 p-3 " + position} style={{maxWidth: "800px"}}>
                    <div className="input-group">
                        {!isMobile &&
                            <button className="btn btn-outline-secondary" onClick={() => {
                                setShow(!show)
                            }}>
                                <i className="bi bi-emoji-smile"/>
                            </button>
                        }
                        <input ref={inputRef} onKeyDown={(event: any) => {
                            onKeyPress(event)
                        }} type="text" onChange={(e) => {
                            onInputChange(e)
                        }} className="form-control message-input" placeholder="Send comment"
                               aria-label="Input comment" aria-describedby="basic-addon2"/>
                        <button onClick={sendMsg} className="btn btn-outline-primary"><i className="bi bi-send"/>
                        </button>
                    </div>
                    <EmojiSelector setEmoji={setEmoji} hide={() => {
                        setShow(false)
                    }} show={show} bottom={80}/>
                    <small className="position-absolute text-secondary"
                           style={{top: "26px", right: "65px", fontSize: "12px"}}>
                        {chatMessage.text?.length}/200
                    </small>
                </div>
            </div>
        </>
    )

}

export default ChatView