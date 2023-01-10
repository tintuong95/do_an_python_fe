import axios from "axios";

export default axios.create({
    baseURL: process.env.HOST,
    timeout: 1000,
});