import React, {FC, useEffect, useState} from "react";
import ChatMessage from "../../model/chat/ChatMessage";
import "../../components/css/chat/ChatMessageComponent.css"
import Avatar from "../user/Avatar";
import {formatTime} from "../util/TimeUtil";

interface ChatMessageProps {
    message: ChatMessage;
    fromMe: boolean
}

const ChatMessageComponent: FC<ChatMessageProps> = ({message, fromMe}) => {
    return (
        <div className={"chat-message position-relative " + (fromMe ? "from-me" : "") + " border"}>
            <div className="body pt-3">
                <div className="avatar">
                    <Avatar avatar={message.sender.avatar}/>
                </div>
                <div className="text">
                    <div className="text-header">
                        <h5>{message.sender.username}</h5>
                        <small className="text-secondary">{formatTime(new Date(message.date))}</small>
                    </div>
                    <p>{message.text}</p>
                </div>
            </div>
            <i className={(message.read ? "bi bi-eye-fill" : "bi bi-eye text-secondary") + " position-absolute"}
               style={{top: "5px", right: "10px"}}/>
        </div>
    )
}

export default ChatMessageComponent