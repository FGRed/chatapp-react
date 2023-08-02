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
