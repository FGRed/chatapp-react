import axios from "axios";

export const logIn = async (username:string, password:string) => {
    try{
        const formData:FormData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        const response = await axios.post("/cuser/log-in", formData)
        return response.data
    }catch (ex){
        console.error(ex)
    }
}

export const getCurrentSessionUser = async () => {
    try{
        const response = await axios.get("/cuser/current")
        return response.data
    }catch (ex){
        console.error(ex)
    }
}

export const setEmail = async (email:string) => {
    try{
        const response = await axios.put(`/cuser/email-change/${email}`)
        return response.data
    }catch (ex){
        console.error(ex)
    }
}

export const setUsername = async (username:string) => {
    try{
        const response = await axios.put(`/cuser/username-change/${username}`)
        return response.data
    }catch (ex){
        console.error(ex)
    }
}
