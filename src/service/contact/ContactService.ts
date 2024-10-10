import axios from "axios";

export const getCurrentSessionContacts = async () => {
    try {
        const response = await axios.get(`/api/contact/`)
        console.log(response)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}
export const addContact = async (contactId: number | undefined) => {
    try {
        const response = await axios.put(`/api/contact/` + contactId)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}

export const contactExists = async (userId: number | undefined) => {
    try {
        const response = await axios.get(`/api/contact/exists/${userId}`)
        return response.data
    } catch (ex) {
        console.error(ex)
    }
}
