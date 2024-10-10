import store from "../../redux/store";

export const navigateTo=(index:number)=>{
   store.dispatch({type: "SET_ACTIVE_INDEX", activeIndex: index})
}

export const navigateToChats=()=>{
    store.dispatch({type: "SET_ACTIVE_INDEX", activeIndex: 0})
}