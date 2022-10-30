import { useRouter } from 'next/router';
import React, { useContext }  from 'react'
import Profile from '../components/Profile'
import { AuthContext } from '../context/auth'
function Profile1() {
  const {user} =useContext(AuthContext);
  console.log("To see the profile");
  const Redirect=()=>{
     const route=useRouter();
     route.push("/login");
  }
  return (
   <>
   {user?.uid?
    <Profile/> : <Redirect/>
   }
   </>
  )
}

export default Profile1