import React, {FC} from "react";
import "../css/user/Avatar.css"
import {Ratio} from "react-bootstrap";
interface avatarProps {
    avatar: string
}

const Avatar: FC<avatarProps> = ({avatar}) => {
    return (
        <Ratio aspectRatio="1x1">
            <div className="avatar border border-secondary rounded" style={{backgroundImage: "url(\"" + avatar + "\")"}}/>
        </Ratio>
    )
}

export default Avatar