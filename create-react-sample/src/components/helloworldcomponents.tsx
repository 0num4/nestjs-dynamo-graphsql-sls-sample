// apiに通信してhelloworldを返すapi componets
import axios from "axios";
import React, {useState, useEffect} from 'react'
// import { hello } from "../api/helloworld"

type AppProps = { message: string }; // interfaceでもよい
const Helloworld =({ message }: AppProps) => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getHelloData = async ()=>{
            const res = await axios.get('https://9s9unqlpkk.execute-api.ap-northeast-1.amazonaws.com/dev')
            setPosts(res.data)
        }
        getHelloData()
    }, [])
    return <div>
       AAA {posts} AAA      
    </div>
}
export default Helloworld;