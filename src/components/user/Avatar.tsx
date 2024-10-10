import React, {FC, ReactNode} from "react";
import "../css/user/Avatar.css"
import {Ratio} from "react-bootstrap";

interface avatarProps {
    avatar?: string
    children?: ReactNode
    style?: {}
    className?: string
    variant?: string
}

const Avatar: FC<avatarProps> = ({avatar, children, style, className, variant}) => {

    let variantClass: string | undefined = ""

    if (variant === "user-ribbon") {
        variantClass = "avatar--user-info-ribbon"
    } else if (variant === "chat-message") {
        variantClass = "avatar--chat-message"
    }

    return (
        <Ratio aspectRatio="1x1" className={variantClass + " " + className} style={style}>
            <div>
                <div className="avatar border border-secondary rounded position-relative"
                     style={{backgroundImage: "url(\"data:image/jpeg;base64," + avatar + "\")"}}/>
                {children}
            </div>
        </Ratio>
    )
}


export default Avatar