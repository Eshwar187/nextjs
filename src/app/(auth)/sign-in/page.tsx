'use client'
import { useSession,signIn,signOut } from "next-auth/react"

export default function Component(){
    const{data:session}=useSession()
    if(session){
        return(
            <>
            <h1>Hello, {session.user.email}!</h1>
            <button onClick={()=>signOut()}>Sign Out</button>
            </>
        )
    }
    return(
        <>
        Not signed in <br />
        <button className="bg-orange-500 px-3 py-1 m-4 rounded" onClick={()=>signIn()}>Sign In</button>
        </>
    )
}