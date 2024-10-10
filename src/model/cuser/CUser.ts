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

export const isCUser=(object: any): object is CUser=>{
    return 'username' in object
        && 'email' in object
        && 'avatar' in object
        && 'role' in object
        && 'online' in object
        && 'creationDate' in object
        && 'lastLogin' in object
        && 'authorities' in object
        && 'freeWord' in object
}

export default CUser