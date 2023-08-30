const convert=(char:string)=>{
    if(char && char.length > 2) {
        // @ts-ignore
        if ((char.at(char.length - 1) + char.at(char.length - 2)) === ":D") {
            return "😃"
        }
    }
    return char
}
export default convert