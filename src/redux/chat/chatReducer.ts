import Chat from "../../model/chat/Chat";

interface Action{
    type:string,
    chat:Chat
}

const chat:Chat={
    id:"",
    chatParticipants: [],
    lastMessage:"",
    chatCreatorId:0,
}

const chatReducer=(state=chat, action:Action)=>{
    switch (action.type){
        case "SET_CHAT":
            return action.chat
        default:
            return state
    }
}

export default chatReducer