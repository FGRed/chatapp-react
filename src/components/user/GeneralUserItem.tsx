import {FC, ReactNode} from "react";
import React from "react";
import CUser from "../../model/cuser/CUser";
import Avatar from "./Avatar";
import "../css/user/GeneralUserItem.css"

type Props = {
    onClick?: () => void
    className?: string
    user: CUser
    children?: ReactNode[]
    style?:string
}

const GeneralUserItem: FC<Props> = ({onClick, className, user, children}) => {

    console.log(user)

    return (
        <div className={`general-user-item p-3 border ${onClick && 'pointer-on-hover '} ${className}`} onClick={onClick}>
            <div className="avatar-wrapper">
                <Avatar className="me-2"
                        variant="chat-message" avatar={user.avatar}>
                    <i className={"bi " + (user.online ? "bi-circle-fill online" : "bi-circle") + " chat-component-online-dot"}/>
                </Avatar>
            </div>
            <div className="info-wrapper">
                <h5>{user.username}</h5>
                {children}
            </div>
        </div>

    )
}

export default GeneralUserItem