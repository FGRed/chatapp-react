export const formatTime = (date: Date):string => {

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return day + "/" + month + "/" + year + " " + hours + ":" + minutes
}