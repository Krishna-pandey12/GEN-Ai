import {useAuth} from "../hooks/useAuth";
import React from 'react'

const Protected=({children})=>{
  const{loading,user}=useAuth()
  const navigate=useNavigate()

  if(loading){
    return (<main><h1>Loading....</h1></main>)
  }
  if(!user){
    return <Navigate to={'/login'}/>
    return null


  }
  return children
}
export default Protected