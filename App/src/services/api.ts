import axios from "axios";

export const api = axios.create({
    baseURL: 'http://10.109.0.28:3000'
})