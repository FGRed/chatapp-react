import store from "../../redux/store";

export function showDialog(message:string, title:string, acceptFunction: ()=>void){
    store.dispatch({
        type:"SET_DIALOG",
        message: message,
        title: title,
        acceptFunction: acceptFunction
    })
}

export function hideDialog(){
    store.dispatch({
        type:"HIDE_DIALOG",
    })
}