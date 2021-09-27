// apiに通信してhelloworldを返すapi componets
import React, {useState, useEffect} from 'react'
import { hello } from "../api/helloworld"

type AppProps = { message: string }; // interfaceでもよい
const Helloworld =({ message }: AppProps) => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getHelloData = async ()=>{
            // const res = await axios.get('https://9s9unqlpkk.execute-api.ap-northeast-1.amazonaws.com/dev')
            const res = await hello()
            setPosts(res.data)
        }
        getHelloData()
    }, [])
    return <>
       AAA {posts} AAA      
    </>
}
export default Helloworld;