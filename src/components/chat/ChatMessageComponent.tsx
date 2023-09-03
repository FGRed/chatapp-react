import React, {FC, useEffect, useState} from "react";
import ChatMessage from "../../model/chat/ChatMessage";
import "../../components/css/chat/ChatMessageComponent.css"
import Avatar from "../user/Avatar";
import {formatTime} from "../util/TimeUtil";
import {setRead} from "../../service/chat/ChatService";

interface ChatMessageProps {
    message: ChatMessage;
    fromMe: boolean
}

const ChatMessageComponent: FC<ChatMessageProps> = ({message, fromMe}) => {


    const onClick=async ()=>{
        if(!fromMe) {
            await setRead([message.id])
        }
    }

    return (
        <div className={"chat-message position-relative " + (fromMe ? "from-me" : "clickable") + " border " + (message.id ? "" : "non-loaded")} onClick={onClick}>
            <div className="body pt-3">
                <div className="avatar">
                    <Avatar avatar={message.sender.avatar}/>
                </div>
                <div className="text bi-ey">
                    <div className="text-header">
                        {!fromMe ?
                            <h5>{message.sender.username}</h5>
                            : <h5>Me ({message.sender.username})</h5>
                        }
                        <small className="text-secondary">{formatTime(new Date(message.date))}</small>
                    </div>
                    <p>{message.text}</p>
                </div>
            </div>
            {fromMe &&
                <div className="d-flex position-absolute" style={{top: "5px", gap:"5px", right: "12px", fontSize:"12px"}}>
                <i className={(message.read ? "bi bi-check-all" : "bi bi-check text-secondary")}
                   />
                    {message.readDate &&
                        <small className="read-date">{formatTime(new Date(message.readDate))}</small>
                    }
                </div>
            }
            {!fromMe &&
                <div className="d-flex position-absolute" style={{top: "5px", gap:"5px", right: "10px"}}>
                    <i className={(message.read ? "bi bi-check-circle-fill" : "bi bi-check-circle text-secondary")}></i>
                </div>
            }

        </div>
    )
}

export default ChatMessageComponent