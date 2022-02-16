import axios from 'axios'

export default function set(token: string){
    axios.interceptors.request.use(() => {
        return 'Bearer ' + token
    })
}