const dialogOptions = {
    show: false,
    message: "",
    title: "",
    acceptFunction: () => {
    }
}

interface Action {
    type: string
    message?: string,
    acceptFunction?: () => void
    title?: ""
}

const dialogReducer = (state = dialogOptions, action: Action) => {
    if (action.type === "SET_DIALOG") {
        return {show: true, message: action.message, acceptFunction: action.acceptFunction}
    } else if (action.type === "HIDE_DIALOG") {
        return {...state, show: false};
    } else {
        return state
    }
}

export default dialogReducer