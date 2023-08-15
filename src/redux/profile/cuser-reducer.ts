import CUser from "../../model/cuser/CUser";

const user: CUser = {
    id: undefined,
    username: "",
    avatar: "",
    online: false,
    creationDate: new Date(),
    lastLogin: new Date(),
    email: "",
    role: "",
    authorities:[{authority:""}]
}

interface Action {
    type: string
    cuser: CUser
}

const cuserReducer = (state =  user, action: Action) => {
    if (action.type === 'SET_USER') {
        return action.cuser
    }else if (action.type === "RESET_USER") {
        return user
    } else {
        return state
    }
}
export default cuserReducer
