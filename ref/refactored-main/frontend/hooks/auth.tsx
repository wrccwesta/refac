"use client"

import useSWR from 'swr'
import axios, {isCancel, AxiosError} from 'axios';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()
  const axiosRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    headers: {'X-Custom-Header': router.path}
  });
  
  const { data: user, error, mutate } = useSWR('/northplay/casino/auth/user', () =>
    axiosRequest.get('/northplay/casino/auth/user').then(res => res.data),
    {
      onError: error => {
        if (error.response.status === 409) {
          router.push('/verify-email')
        }
      },
    }
  )

  const csrf = async () => {
    await axiosRequest.get('/sanctum/csrf-cookie')
  }

  const register = async ({ setErrors, ...props }) => {
    try {
      await csrf()
      setErrors([])
      await axiosRequest.post('/northplay/casino/auth/register', props)
      mutate()
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const login = async ({ setErrors, setStatus, ...props }) => {
    try {
      await csrf()
      setErrors([])
      setStatus(null)
      await axiosRequest.post('/northplay/casino/auth/login', props)
      mutate()
      window.location.pathname = '/'
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const changePassword = async ({ setChangePasswordStatus, setChangePasswordErrors, email }) => {
    setChangePasswordErrors([])
    setChangePasswordStatus(null)
    try {
      const response = await axiosRequest.post('/northplay/casino/auth/change-password', { email })
      setChangePasswordStatus(response.data.status)
    } catch (error) {
      setChangePasswordErrors(error.response.data)
    }
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    try {
      await csrf()
      setErrors([])
      setStatus(null)
      const response = await axiosRequest.post('/northplay/casino/auth/forgot-password', { email })
      setStatus(response.data.status)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const resetPassword = async ({ setNewPasswordErrors, setNewPasswordStatus, magicToken, magicEmail, newPassword, ...props }) => {
    try {
      await csrf()
      setNewPasswordErrors([])
      setNewPasswordStatus(null)
      const response = await axiosRequest.post('/northplay/casino/auth/reset-password', { token: magicToken, email: magicEmail, password: newPassword, password_confirmation: newPassword, ...props })
      setNewPasswordStatus(response.data.status)
    } catch (error) {
      if (error.response.status === 422) {
        setNewPasswordErrors(error.response.data.errors)
      } else {
        throw error
      }
    }
  }

  const updateEmailAddress = async ({ newEmail, setUpdateEmailStatus, ...props }) => {
    setUpdateEmailStatus(null)
    try {
      const response = await axiosRequest.post('/northplay/casino/auth/email/update-email', { email: newEmail, ...props })
      setUpdateEmailStatus(response.data.status)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  
  const notifications = async ({ setErrors, setNotificationsAll, setNotificationsCount, ...props }) => {
    try {
      await csrf()
      setErrors([])
      const response = await axiosRequest.get('/northplay/casino/auth/notifications/all', { ...props })
      console.log(response);
      setNotificationsAll(response.data.data.notifications);
      setNotificationsCount(response.data.data.notificationsCount);

    } catch (error) {
      console.log(error);
    }
  }
  
  
    const resendEmailVerification = ({ setVerificationStatus }) => {
        axiosRequest
            .post('/northplay/casino/auth/email/verification-notification')
            .then(response => setVerificationStatus(response.data.status))
    }

    const logout = async () => {
        if (! error) {
            await axiosRequest.post('/northplay/casino/auth/logout').then(() => mutate())
        }
        window.location.pathname = '/'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        notifications,
        changePassword,
        forgotPassword,
        resetPassword,
        updateEmailAddress,
        resendEmailVerification,
        logout,
    }
}
