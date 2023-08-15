import axios, {AxiosError} from "axios";

export const logIn = async (username: string, password: string) => {
    try {
        const formData: FormData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        const response = await axios.post("/api/session/", formData)
        return response.data
    } catch (ex) {
        console.error(ex)
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
        const response = await axios.delete(`/api/session/logout`)
        return response.data
    } catch (ex) {
        console.error(ex)
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
        return response.data
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
        const response = await axios.get(`/api/cuser/list`)
        return response.data
    } catch (ex:any) {
        console.error(ex)
        return ex.response.data
    }
}