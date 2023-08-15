import axios from "axios";
import {ChatMessageDTO} from "../../model/chat/ChatMessage";

export const getChats = async () => {
    console.time("chatsTimer")
    try {
        const response = await axios.get(`/api/chat/chats`)
        console.timeEnd("chatsTimer")
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const getChatsMessages = async (UUID:string) => {
    console.time("chatsTimer")
    try {
        const response = await axios.get(`/api/chatmessage/by-chat-uuid/${UUID}`)
        console.log(response.data)
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