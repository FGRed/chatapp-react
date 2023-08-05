interface Action {
    type: string
}

const modalsState = {
    showLoginModal: false
}


const modalsReducer = (state = modalsState , action: Action) => {
    if (action.type === 'SHOW_LOGIN_MODAL') {
        return {...state, showLoginModal: true}
    } else if(action.type === "HIDE_LOGIN_MODAL") {
        return {...state, showLoginModal: false}
    }
    return state
}
export default modalsReducer
