import axios, {AxiosError} from "axios";

export const logIn = async (username: string, password: string, logoutActive?: boolean | undefined) => {
    try {
        const formData: FormData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        if(logoutActive){
            formData.append("logout-active", String(logoutActive))
        }

        console.log("Logging in")
        const response = await axios.post("/api/session/log-in", formData)
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            const axiosError = error as AxiosError
            if(axiosError.response){
                return axiosError.response.data
            }
        }
    }
}

export const getCurrentSessionUser = async () => {
    try {
        const response = await axios.get("/api/session/current")
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const setEmail = async (email: string) => {
    try {
        const response = await axios.put(`/api/cuser/email/${email}`)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const setUsername = async (username: string) => {
    try {
        const response = await axios.put(`/api/cuser/username/${username}`)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}
export const logout = async () => {
    try {
        const response = await axios.delete(`/api/session/log-out`)
        return response.data
    } catch (error: unknown) {
        if(axios.isAxiosError(error)){
            console.log(error.response)
        }
    }
}

export const changeAvatar = async (avatarBase64: Blob) => {
    try {
        const formData = new FormData()
        formData.append("avatar-file", avatarBase64)
        const response = await axios.post(`/api/cuser/avatar`, formData)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const userAlreadyLoggedIn = async (username: string, password: string) => {
    try {
        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        const response = await axios.post(`/api/session/in-registry/`, formData)
        return response.data.value0
    } catch (ex:any) {
        console.error(ex)
        return ex.response.data
    }
}

export const submitForm = async (formData:FormData) => {
    try {
        const response = await axios.post(`/api/cuser/`, formData)
        return response.data
    } catch (ex:any) {
        console.error(ex)
        return ex.response.data
    }
}

export const getUsersList = async () => {
    try {
        const response = await axios.get(`/api/cuser/`)
        return response.data
    } catch (ex:any) {
        console.error(ex)
        return ex.response.data
    }
}

export const find = async (keyword:string) => {
    try {
        const response = await axios.get(`/api/cuser/find/`+keyword)
        return response.data
    } catch (ex:any) {
        console.error(ex)
        return ex.response.data
    }
}

export const loginAndLogoutAlreadyLoggedInUser = async (username:string, password:string) =>{

}