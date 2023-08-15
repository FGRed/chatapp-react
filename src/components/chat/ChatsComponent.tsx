import React, {FC, useEffect} from "react";
import Chat from "../../model/chat/Chat";
import Avatar from "../user/Avatar";
import "../css/chat/ChatComponent.css"
import CUser from "../../model/cuser/CUser";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

interface Props{
    chat:Chat
}

const ChatsComponent:FC<Props>=({chat})=>{

    const[participantsString, setParticipantsString] = React.useState<string>("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(chat.chatParticipants) {
            var pString: string = ""
            const participantsLen = chat.chatParticipants.length
            chat.chatParticipants.forEach((cUser: CUser, index) => {
                pString += cUser.username
                if (index < participantsLen - 1) {
                    pString += ", "
                }
            })
            setParticipantsString(pString)
        }
    }, [])

    const openChat=()=>{
        dispatch({type:"SET_CHAT", chat: chat})
        dispatch({type:"SET_ACTIVE_INDEX", activeIndex: 0})
    }

    return(
        <div className="chat-component p-4 border-bottom" onClick={openChat}>
            <div className="chats-avatar">
                {
                    chat.chatParticipants.map(chat=>(
                        <Avatar className="me-2" variant="avatar-chat-message" avatar={chat.avatar}/>
                    ))
                }
            </div>
            <div className="chat-info">
                <div className="chat-component-header">
                    <h5>{participantsString}</h5>
                    <small className="text-secondary">id:{chat.id}</small>
                </div>

                {
                    chat.lastMessage ?
                        <p>{chat.lastMessage}</p>
                        :"No messages yet"
                }

            </div>
        </div>
    )
}

export default ChatsComponent