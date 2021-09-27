import { apiClient } from "../util/apiClient";

export const hello = ()=>{
    return apiClient.get("/dev")
}