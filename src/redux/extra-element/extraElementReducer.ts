interface Action{
    type: string,
    element: HTMLElement | undefined
}

const extraElementReducer=(state = {element: undefined}, action: Action)=>{
    if(action.type === "SET_ELEMENT"){
        return {element: action.element}
    }else {
        return state
    }
}

export default extraElementReducer