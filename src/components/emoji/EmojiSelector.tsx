import React, {FC} from "react";
import EmojiPicker, {EmojiClickData, EmojiStyle, Theme} from "emoji-picker-react";
import "../css/emoji/EmojiSelector.css"

interface Props {
    show: boolean,
    hide: () => void,
    left?: number,
    right?: number,
    bottom?: number,
    top?: number,
    className?: string,
    id?: string
    style?: string,
    setEmoji: (emoji: string) => void | undefined
}

const EmojiSelector: FC<Props> = ({show, left, right, top, bottom, className, id, style, hide, setEmoji}) => {

    const onEmojiClick = (emoji: EmojiClickData) => {
        setEmoji(emoji.emoji)
        hide()
    }

    return (
        <>
            {show &&
                <div
                    className="emoji-picker-wrapper position-fixed"
                    style={{
                        top: top,
                        bottom: bottom,
                        left: left,
                        right: right
                    }}>
                    <EmojiPicker
                        theme={Theme.DARK}
                        onEmojiClick={(emoji) => {
                            onEmojiClick(emoji)
                        }}
                        emojiStyle={EmojiStyle.NATIVE}
                    />
                </div>
            }
        </>
    )
}

export default EmojiSelector