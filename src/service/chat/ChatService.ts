import axios from "axios";
import ChatMessage, {ChatMessageDTO} from "../../model/chat/ChatMessage";

export const getChats = async () => {
    try {
        const response = await axios.get(`/api/chat/chats`)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const getChatsMessages = async (UUID:string) => {
    try {
        const response = await axios.get(`/api/chatmessage/by-chat-uuid/${UUID}`)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const sendMessage = async (message:ChatMessageDTO) => {
    try {
        const response = await axios.post(`/api/chatmessage/`, message)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const setRead = async (messages:string[]) => {
    try {
        await axios.put(`/api/chatmessage/set-read`, messages)
    } catch (ex) {
        console.error(ex)
    }
}
