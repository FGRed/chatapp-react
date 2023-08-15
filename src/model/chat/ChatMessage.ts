import CUser from "../cuser/CUser";

interface ChatMessage {
    id: string,
    text: string,
    date: Date
    senderId: number,
    receiverId: number
    sender: CUser
}

export interface ChatMessageDTO{
    text: string | undefined,
    receiverId: number | undefined
    chatId: string | undefined
}

export default ChatMessage