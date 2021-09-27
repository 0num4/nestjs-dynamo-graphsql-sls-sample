import { apiClient } from "../util/apiClient";

export const login = (
        mail:any,
        password:any
    )=>{
    return apiClient.post("/login",{
        mail,
        password
    })
}