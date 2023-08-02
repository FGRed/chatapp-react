interface CUser {
    id: number,
    username: String,
    email: String,
    avatar: String,
    role: String,
    online: boolean,
    creationDate: Date,
    lastLogin: Date
}

export default CUser