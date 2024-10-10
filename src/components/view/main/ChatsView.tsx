import React, {useEffect, useState} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {getChats} from "../../../service/chat/ChatService";
import ChatsChat from "../../chat/ChatsChat";
import Chat from "../../../model/chat/Chat";
import {Client} from "@stomp/stompjs";
import {useDispatch, useSelector} from "react-redux";

const ChatsView = () => {

    const [chats, setChats] = useState<any>([])
    const [showSpinner, setShowSpinner] = useState(true)
    const chat: Chat = useSelector((state: any) => state.chatReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const getChatsAsync = async () => {
            const chats = await getChats()
            setChats(chats)
        }
        getChatsAsync().then(() => {
            setShowSpinner(false)
        })

        const onConnect = () => {
            console.log("Connected to client")
            client.subscribe("/topic/participant-status", (message: any) => {
                getChatsAsync().then(() => {
                    setShowSpinner(false)
                })
            })
        }

        let client = new Client({
            brokerURL: "ws://192.168.1.191:8080/ws-message",
            reconnectDelay: 5000,
            heartbeatIncoming: 400,
            heartbeatOutgoing: 400,
            onConnect: onConnect,
            onDisconnect: () => {
                console.log("Disconnected")
            }
        })

        client.activate()
        return()=>{
            client.deactivate()
        }
    }, [])

    return (
        <Container fluid id="chat-view-container" className="g-0 border">
            <Row>
                <Col id="chats-view">
                    {chats && chats.length > 0 &&
                        chats.map((chat: Chat) => (
                            <ChatsChat key={"chat-" + chat.id} showLatestMessage chat={chat}/>
                        ))
                    }
                    {chats &&
                    !showSpinner ?
                        <h2 className="no-content">
                            {!chats && "No chats available"}
                        </h2>
                        :
                        <div className="no-content">
                            <Spinner/>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ChatsView