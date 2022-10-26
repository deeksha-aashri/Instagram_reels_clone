import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import logo from "../assets/instagramlogo.png";
import Button from "@mui/material/Button";

import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Link from 'next/link'

function forgot() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { forgetPassword, user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      //route to feeds page
      router.push("/");
    }
  }, [user]);
  let handleClick = async () => {
    try {
      console.log(email);
      setLoading(true);
      setError("");
      await forgetPassword(email);
        console.log("email sent");
        router.push('/login');
    } catch (err) {
      console.log("error ", err);
      setError(err.code);
      // use settimeout to remove error after 2sec
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };
  return (
   
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"20vh"}}>
        <div className="login-card" style={{height:"15rem"}}>
          <Image src={logo} />
          <TextField
            id="outlined-basic"
            size="small"
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error != "" && <div style={{ color: "red" }}>{error}</div>}

          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            component="label"
            fullWidth
            onClick={handleClick}
            disabled={loading}
          >
            Send Mail
          </Button>
        </div>
        <div className="bottom-card" style={{width:"23rem"}}>
          Do not have an account ?
          <Link href='/signup'>
            <span style={{ color: "blueviolet",marginLeft:"0.2rem" }}>Signup</span>
          </Link>
        </div>
      </div>
    
  );
}

export default forgot;