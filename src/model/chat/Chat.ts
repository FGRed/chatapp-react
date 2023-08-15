import CUser from "../cuser/CUser";

interface Chat{
    id:string,
    chatParticipants: CUser[],
    chatCreatorId:number,
    lastMessage:string
}



export default Chat