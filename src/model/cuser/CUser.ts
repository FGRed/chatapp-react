interface Authority {
    authority:string
}

interface CUser {
    id?: number,
    username?: string,
    email?: string,
    avatar?: string,
    role?: string,
    online?: boolean,
    creationDate?: Date,
    lastLogin?: Date,
    authorities?: Authority[],
    freeWord?: string
}

export default CUser