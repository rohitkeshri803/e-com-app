import React from 'react'
import { Layout } from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

export const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={"shop now"}>
        <h1>HOME PAGE</h1>
        <pre> {JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}
