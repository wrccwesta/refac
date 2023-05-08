"use client"

import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import axios, {isCancel, AxiosError} from 'axios';

export const useGamedata = () => {
    const router = useRouter()
    const { toast } = useToast()
    const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

    const axiosRequest = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        timeout: 5000,
      });
      
      const rowGameData = async ({ gamesKey, setGamesData, setErrors, ...props }) => {
        try {
          const response = await axiosRequest.get('/northplay/casino/data/games-row?key='+gamesKey, { ...props })
            setGamesData(response.data);
        } catch (error) {
          setErrors(error);
        }
      }

    return {
        rowGameData,
    }
}
