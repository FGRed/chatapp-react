import CUser from "../model/cuser/CUser";

const isCuser=(object: any): object is CUser=>{
    return 'username' in object && 'email' in object
}