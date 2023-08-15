interface Action{
    selectedFile: File
    type:string
}

export const imageCropperReducer = (state = {show: false, file: undefined}, action: Action) => {
    if (action.type === "SHOW_IMAGE_CROPPER") {
        return {show: true, file: action.selectedFile}
    }else if(action.type === "HIDE_IMAGE_CROPPER"){
        return {show: false, file: undefined}
    }else{
        return state
    }
}

export default imageCropperReducer