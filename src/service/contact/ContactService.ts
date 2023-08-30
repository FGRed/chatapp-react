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