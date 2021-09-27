import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://9s9unqlpkk.execute-api.ap-northeast-1.amazonaws.com', // api server
    withCredentials: true, //send cookie
})

export {apiClient};