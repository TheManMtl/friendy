import axios from "axios";


import {Constants} from "../../data/constants"

export default axios.create({
    baseURL: Constants.BASE_URL
});

export const axiosToken = axios.create({
    baseURL: Constants.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const axiosUpload = axios.create({
    baseURL: Constants.BASE_URL,
    headers: {'Content-Type': 'multipart/form-data'},
    withCredentials: true,
});
