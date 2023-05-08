"use client"

import axios, {isCancel, AxiosError} from 'axios';

const axiosRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
})

export default axiosRequest
