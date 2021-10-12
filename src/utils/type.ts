export interface responseObject{
    status : number,
    message : memberObject[] |string
}

export interface memberObject{
    member_id : string,
    firstName : string,
    lastname : string,
    telephone : string,
    password : string,
    isActive : string
}