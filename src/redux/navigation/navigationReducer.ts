interface Action {
    type: string,
    activeIndex: number
}


const navigationReducer = (state = 3, action: Action) => {
    switch (action.type) {
        case "SET_ACTIVE_INDEX":
            return action.activeIndex
        default:
            return state
    }
}

export default navigationReducer