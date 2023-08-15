import React, {useEffect, useRef, useState} from "react";
import {Col, Spinner} from "react-bootstrap";
import "../../css/view/main/ChatView.css";
import ChatMessageComponent from "../../chat/ChatMessageComponent";
import {useSelector} from "react-redux";
import ChatMessage, {ChatMessageDTO} from "../../../model/chat/ChatMessage";
import {getChatsMessages, sendMessage} from "../../../service/chat/ChatService";
import Chat from "../../../model/chat/Chat";
import CUser from "../../../model/cuser/CUser";
import {isMobile} from 'react-device-detect'
// @ts-ignore
import SockJsClient from 'react-stomp';

const ChatView = () => {

    const chat: Chat = useSelector((state: any) => state.chatReducer)
    const cuser: CUser = useSelector((state: any) => state.cuserReducer)
    const [chatMessages, setChatMessages]: any = useState<any>([])
    const [showSpinner, setShowSpinner] = useState(false)
    const [position, setPosition] = useState("position-absolute")
    const [chatMessage, setChatMessage] = useState<ChatMessageDTO>({receiverId: -1, text: "", chatId: ""})
    const inputRef:any = useRef()

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
    }, [])

    useEffect(() => {
        setShowSpinner(true)
        const getChatMessagesAync = async () => {
            const messages = await getChatsMessages(chat.id)
            setChatMessages(messages)
            setShowSpinner(false)
        }
        getChatMessagesAync()
    }, [chat])

    useEffect(() => {
        const root = document.getElementById("app-root")
        console.log('isMobile '+isMobile)
        if(elementOverflows(root)) {
            if(isMobile){
                setPosition("position-fixed")
            }else{
                setPosition("position-sticky")
            }

        }else{
            setPosition("position-absolute")
        }

    }, [chatMessages])

    const sendMsg = async () => {
        await sendMessage(chatMessage)
        if (inputRef.current) {
            inputRef.current.value = ""
            setChatMessage({...chatMessage, text:""})
        }

    }

    const onKeyPress = (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            sendMsg()
        }
    }

    const addMsg = (msg: any) => {
        setChatMessages((prevItems: any) => [...prevItems, msg]);
        scrollToBottom()
    }

    const scrollToBottom = () => {
        const root = document.getElementById("app-root")
        if (root) {
            root.scrollTop = root.scrollHeight;
        }
    };

    const elementOverflows=(element:HTMLElement | null)=>{
        console.log(element?.offsetHeight)
        console.log(element?.scrollHeight)
        if(element) {
            return element.offsetHeight < element.scrollHeight;
        }
    }

    return (
        <>
            <SockJsClient
                url="/api/ws"
                topics={['/topic/message']}
                onMessage={(chatMessage: any) => addMsg(chatMessage)}
                onConnect={() => {
                    console.log("Connected")
                }}>
            </SockJsClient>
            <div className={"row"  + (isMobile ? " mobile-view" : "")}>
                <Col ref={inputRef}>
                    {showSpinner &&
                        <div className="no-content">
                            <Spinner/>
                        </div>
                    }
                    {chatMessages && chatMessages.map((m: ChatMessage) => (
                        <ChatMessageComponent message={m}/>
                    ))}
                </Col>
                {chatMessages &&
                    <div className={"chat-field border p-3 " + position}>
                        <div className="input-group">
                            <input ref={inputRef} onKeyDown={(event: any) => {
                                onKeyPress(event)
                            }} type="text" onChange={(e) => {
                                setChatMessage({...chatMessage, text: e.target.value})
                            }} className="form-control" placeholder="Send comment"
                                   aria-label="Input comment" aria-describedby="basic-addon2"/>
                            <button onClick={sendMsg} className="btn btn-outline-primary"><i className="bi bi-send"/>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    )

}

export default ChatView