import React, {useEffect, useState} from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import {getChats} from "../../../service/chat/ChatService";
import ChatsComponent from "../../chat/ChatsComponent";
import Chat from "../../../model/chat/Chat";

const ChatsView = () => {

    const [chats, setChats] = useState<any>([])
    const [showSpinner, setShowSpinner] = useState(true)

    useEffect(() => {
        const getChatsAsync = async () => {
            const chats = await getChats()
            setChats(chats)
        }
        getChatsAsync().then(()=>{
            setShowSpinner(false)
        })
    }, [])

    return (
        <Row>
            <Col>
                {chats && chats.length > 0 &&
                    chats.map((chat: Chat) => (
                        <ChatsComponent key={"chat-"+chat.id} showLatestMessage chat={chat}/>
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
    )
}

export default ChatsView