"use client"

import React, { useEffect, useState } from 'react';
import { buttonVariants, Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/auth"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  UserPlus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LoginForm } from "@/components/casino/auth-login-form"

interface AuthDialogProps {
  triggerType: "button" | "text"
  triggerClass: string
  triggerText: string
  tabsDefault: "register" | "login"
}

export function AuthDialog({ ...AuthDialogProps }: AuthDialogProps) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [validationChecked, setValidationChecked] = useState(false)
    const [validationFailed, setValidationFailed] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const { toast } = useToast()
    const [authType, setAuthType] = useState('')

      const { login, register } = useAuth({
          middleware: 'guest',
          redirectIfAuthenticated: '/',
      })
       const validateEmailRegex = (value) => {
         return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
       };
       const validatePasswordRegex = (value) => {
          return value.match(/^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/);
       };
       const validateUserTag = (value) => {
          return value.match(/^[a-z0-9_-]{4,20}$/);
       };

      const resetValues = async () => {
        if(!loading) {
          await setMessage(null);
          await setName('');
          await setEmail('');
          await setPassword('');
          await setValidationChecked(false);
          await setValidationFailed(false);
        }
      }

      const validationChecks = async () => {
        var regexCheckEmail = validateEmailRegex(email)
        var regexCheckPassword = validatePasswordRegex(password)
        if(authType === "register") {
          var regexUserTag = validateUserTag(name)
        }

        if(!regexCheckEmail) {
            setValidationFailed(true);
            setValidationChecked(true);
              toast({
                title: "Auth Error",
                description: "You did not enter a valid email address.",
              })
            setMessage("You did not enter a valid email address.");
            return;
        }

         if(!regexCheckPassword) {
              setValidationFailed(true);
              setValidationChecked(true);
              setMessage("Your password should atleast be 8+ characters and include 1 numeric character");
              toast({
                title: "Auth Error",
                description: "You did not enter a valid password.",
              })
            return;
         }
        if(authType === 'register') {
          if(!regexUserTag) {
              setValidationFailed(true);
              setValidationChecked(true);
              toast({
                title: "Auth Error",
                description: "Your usertag must be between 4 and 20 characters. Only numeric & alphabet characters.",
              })
              setMessage("Your usertag must be between 4 and 20 characters. Only numeric & alphabet characters.");
              return;
            }
        }
       setValidationChecked(true);
       return;
  }

  const submitLogin = async event => {
    if(!loading) {
      await setAuthType('login')
      await submitAuth()
      setTimeout(() => {
        setMessage(null)
        setLoading(false);
      }, 450);
    }
  }

  const submitRegister = async event => {
    if(!loading) {
      await setAuthType('register')
      await submitAuth()
      setTimeout(() => {
        setMessage(null)
        setLoading(false);
      }, 550);
    }
  }

  const submitAuth = async event => {
      if(!loading) {
      setLoading(true);
      setValidationChecked(false);
      setValidationFailed(false);
      var checkValidation = await validationChecks()
      if(!checkValidation & validationChecked) {
        if(validationFailed) {
            await setLoading(false);
            return;
        }
        if(!validationFailed & validationChecked) {
           if(authType === "register") {
             await register({
                 name,
                 email,
                 password,
                 password_confirmation: password,
                 setErrors,
             })
           }
           if(authType === "login") {
              await login({
                 email,
                 password,
                 remember: shouldRemember,
                 setErrors,
                 setStatus,
              })
           }
            if(status === null) {
              if(errors.message) {
               toast({
                  title: "Auth Error",
                  description: (errors.message ?? "Unknown Error (possibly API down?)"),
                })
              setMessage(errors.message ?? "Unknown Error (possibly API down?)");
              return;
            }
          }
    }
    }
  }
  }

  return (
     <div key="auth-dialog" className="space-between flex items-center">
      <Tabs defaultValue={AuthDialogProps.tabsDefault === "register" ? "register" : "login"} className="h-full space-y-6">
          <Dialog>
            <DialogTrigger onClick={() => resetValues()}>
              {AuthDialogProps.triggerType === "text" ? <div className={AuthDialogProps.triggerClass ?? "trigger-undefined-class"}>
                  {(AuthDialogProps.triggerText ?? "Authenticate")}</div> :
              <div
                  className={buttonVariants({ variant: "outline", size: "default" })}
                >
                <UserPlus className="mr-2 h-4 w-4" />
                {AuthDialogProps.triggerText ?? "Authenticate"}
              </div>}
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Authenticate</DialogTitle>
                <DialogDescription>
                  <p>Welcome (back). Sign in to your account or register a new one.</p>
                </DialogDescription>
              </DialogHeader>
              <TabsList>
                  <TabsTrigger
                    value="login">
                      Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register">
                      Register
                  </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="border-none p-0">
                  <LoginForm/>
              </TabsContent>

              <TabsContent value="register" className="border-none p-0">
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2 p-1">
                    <div className="space-y-1">
                      <Label htmlFor="name">E-mail</Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="your email"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={event => (loading ? "void" : setPassword(event.target.value))}
                        placeholder="your password"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">User Tag</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder="your user tag (public)"
                      />
                  </div>
                  </div>
                </div>
              </TabsContent>
              <div className="p-2 -mt-4">
                  {message === null ?
                      <small className="opacity-75">By using our service, you have to be 21 years or older.</small>
                      :
                      <small className={(loading ? "text" : "text-red-400")}>{(loading ? "Validating details.." : message)}</small>
                   }
              </div>
              <DialogFooter>
              <TabsContent value="login" className="border-none p-0">
                  {loading ?
                  <div
                      key="login-button-disabled"
                      className={buttonVariants({ size: "default" }) + " cursor-pointer disabled sml-2 "}
                    >
                      Loading...
                  </div>
                  :
                  <div
                      key="login-button"
                      onClick={submitLogin}
                      className={buttonVariants({ size: "default" }) + " cursor-pointer ml-2 "}
                    >
                      Login
                  </div>
                  }
              </TabsContent>

              <TabsContent value="register" className="border-none p-0">
                  {loading ?
                  <div
                      key="register-button-disabled"
                      className={buttonVariants({ size: "default" }) + " cursor-pointer ml-2 "}
                    >
                      Loading...
                  </div>
                  :
                  <div
                      key="register-button"
                      onClick={submitRegister}
                      className={buttonVariants({ size: "default" }) + " cursor-pointer ml-2 "}
                    >
                      Create Account
                  </div>
                  }
              </TabsContent>

              </DialogFooter>
            </DialogContent>
          </Dialog>
      </Tabs>
     </div>
  )
}
