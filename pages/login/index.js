import React, { useContext, useState,useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/instagramlogo.png';
import  Button  from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';
import bg3 from '../../assets/bg3.jpg';
import bg4 from '../../assets/bg4.jpg';
import bg5 from '../../assets/bg5.jpg';
import { AuthContext } from '../../context/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

function index() {
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const route = useRouter();
  const { login, user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      //route to feeds page
      route.push("/");

  

    }
  },[user])
  let handleClick=async()=>{
   try{
    setLoading(true);
    setError("");
    await login (email,password);
    console.log("Successfully logged in");
    
   }
   catch(err){
   console.log("error", JSON.stringify(err));
   setError(err.code);
   setTimeout(() => {
    setError('')
   }, 2000);
   }
   setLoading(false);
  }
  
  return (
    
    
     
    <div className='login-container'>
      <div className='bckgrd'>
        <Carousel className='carousel' autoPlay  infiniteLoop={true} showStatus={false} showIndicators={false} showArrows={false}stopOnHover> 
          <Image src={bg1} width={246} height={440} />
      
          <Image src={bg2} width={246} height={440} />
          <Image src={bg3} width={246} height={440} />
          <Image src={bg4} width={246} height={440} />
          <Image src={bg5} width={246} height={440} />
        </Carousel>
      </div>
    <div>
    <div className='login-card'>
    <Image src={logo}/> 
    <TextField id="outlined-basic"  size="small" label="Email" variant="outlined" fullWidth margin="dense"   value={email} onChange={(e)=>setEmail(e.target.value)}/> 
    <TextField id="outlined-basic"  size="small" label="Password" variant="outlined" fullWidth type="password"  value={password}
            onChange={(e) => setPassword(e.target.value)}  /> 
           { error!="" &&
            <div style={{ color: "red" }}>{error}</div>
           }
            
    <div className='forgotpassword'>Forgot password?</div>
    <Button variant="contained" size="small" fullWidth onClick={handleClick} disabled={loading}>Log in</Button> 
 
   </div>
   <div className='bottomcardlogin' >
    Do not have an account?
    <Link href='/signup'> 
    <span style={{color:"blueviolet", marginLeft:"0.2rem"}}>Sign up</span>
    </Link>
   </div>
   </div>
    </div>
   

    
    
  )
}

export default index