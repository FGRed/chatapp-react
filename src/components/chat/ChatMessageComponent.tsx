import React, {FC} from "react";
import ChatMessage from "../../model/chat/ChatMessage";
import Avatar from "../user/Avatar";
import "../../components/css/chat/ChatMessageComponent.css"

interface ChatMessageProps {
    message: ChatMessage;
}

const ChatMessageComponent: FC<ChatMessageProps> = ({message}) => {
    return (
        <div className="chat-message border-bottom">
            <div className="chat-avatar">
                <Avatar variant="chat-message" avatar={message.sender.avatar}/>
            </div>
            <div className="text">
                <div className="text-header">
                    <h5>{message.sender.username}</h5>
                    <small className="text-secondary">A minute ago</small>
                </div>
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default ChatMessageComponent