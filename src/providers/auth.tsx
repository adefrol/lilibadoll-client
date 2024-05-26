import React, { useEffect, useState } from 'react'
import { UserService } from '@/service/user.service'

export const AuthAdmin = ({children, withError} : {children : React.ReactNode, withError?: boolean}) => {

    const [isAuth, setIsAuth] = useState<boolean | undefined>(false)

    async function checkAuth() {
        const data = await UserService.isAdmin()
        setIsAuth(data)
    }

    useEffect(() => {
        checkAuth()
    }, [])

  return (
    <>{isAuth ? <>{children}</> : withError ? <div className='flex items-center justify-center h-[50svh] text-4xl font-bold'>401 - FORBIDDEN</div> : <></>}</>
  )
}

export const AuthLogged = ({children, withError, deAuth} : {children : React.ReactNode, withError?: boolean, deAuth?: boolean}) => {

  const [isAuth, setIsAuth] = useState<boolean | undefined>(false)

  async function checkAuth() {
      const data = await UserService.isLogged()
      setIsAuth(data)
  }

  useEffect(() => {
      checkAuth()
  }, [])

  if(deAuth) {
    return (
      <>{!isAuth ? <>{children}</> : <></>}</>
    )
  }
  else {
    return (
      <>{isAuth ? <>{children}</> : withError ? <div className='flex items-center justify-center h-[50svh] text-4xl font-bold'>404 - NOT FOUND</div> : <></>}</>
    )
  }
}
