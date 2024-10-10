import React, {FC, useEffect} from "react";
import Chat from "../../model/chat/Chat";
import Avatar from "../user/Avatar";
import "../css/chat/ChatComponent.css"
import CUser from "../../model/cuser/CUser";
import {useDispatch, useSelector} from "react-redux";
import {navigateToChats} from "../navigation/Navigation";

interface Props {
    chat: Chat
    className?: string | undefined
    showLatestMessage?: boolean | undefined
}

const ChatsChat: FC<Props> = ({chat, className, showLatestMessage}) => {

    const [participantsString, setParticipantsString] = React.useState<string>("")
    const cuser = useSelector((state: any) => state.cuserReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (chat.chatParticipants) {
            var pString: string = ""
            chat.chatParticipants.forEach((cUser: CUser, index) => {
                if (cUser.id !== cuser.id) {
                    pString = pString + cUser.username
                }
                if (chat.chatParticipants.length > 2) {
                    pString = pString + ", "
                }
            })
            setParticipantsString(pString)
        }
    }, [])

    const openChat = () => {
        dispatch({type: "SET_CHAT", chat: chat})
        navigateToChats()
    }

    return (
        <div className={"chat-component p-3 border-bottom " + className} onClick={openChat}>
            <div className="chats-avatar">
                {
                    chat.chatParticipants.map(participant => {
                        if (participant.id !== cuser.id) {
                            return (
                                <Avatar key={"chat-participants-avatar-" + participant.id} className="me-2"
                                        variant="chat-message" avatar={participant.avatar}>
                                    <i className={"bi " + (participant.online ? "bi-circle-fill online" : "bi-circle") + " chat-component-online-dot"}/>
                                </Avatar>)
                        }
                        return <></>
                    })
                }
            </div>
            <div className="chat-info">
                <div className="chat-component-header">
                    <h5>{participantsString}</h5>
                </div>
                {showLatestMessage &&
                    (chat.lastMessage ?
                        <p>{chat.lastMessage}</p>
                        : "No messages yet")
                }

            </div>
        </div>
    )
}

export default ChatsChat