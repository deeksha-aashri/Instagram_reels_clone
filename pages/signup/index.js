import React, { useContext, useState ,useEffect} from 'react'
import TextField from "@mui/material/TextField";
import Image from "next/image"
import logo from '../../assets/instagramlogo.png'
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Link from 'next/link'
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc,doc } from 'firebase/firestore';

function index() {
  const [email, setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [fullName,setFullName]=useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const route=useRouter();
  const {signup, user}=useContext(AuthContext);
useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [user]);
  let handleClick=async()=>{
    console.log(email);
    console.log(password);
    console.log(fullName);
    console.log(file);
    
    try{
      
      setLoading(true);
      setError("");
      const userInfo = await signup(email, password);
      console.log(userInfo.user.uid);
     // Upload file and metadata to the object 'userid/Profile/mountains.jpg'
      const storageRef=ref(storage,`${userInfo.user.uid}/Profile`);
      const uploadTask=uploadBytesResumable(storageRef,file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log("Uploaded "+ progress+ "%");
           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        },
        (error)=>{
         // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log(error);
        },
        ()=>{
            // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            console.log("File to be downloaded is available at", downloadURL);
            let userData={
              fullName,
              email,
              password,
              downloadURL,
             uid:userInfo.user.uid,
             posts:[],
             followers:[],
             following:[],
             biodata:null
            }
            //creating a collection called users in databse called db. The name of document id the third arg then we have the data which will go in doc
            await setDoc(doc(db,"users",userInfo.user.uid),userData)
            console.log("Document has been added to the db");
          })
        }

      );
     console.log("User has signed up");

     }
    
    catch(err){
      console.log("err", err);
      setError(err.code);
      // use settimeout to remove error after 2sec
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  }
  
  return (
    <div className="signup-container">
      <div className="signup-card">
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
        <TextField
          id="outlined-basic"
          size="small"
          label="Password"
          variant="outlined"
          fullWidth
          margin="dense"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Button
          color="secondary"
          variant="outlined"
          component="label"
          fullWidth
          size="small"
          startIcon={< CloudUploadIcon/>}
        >
          Upload Profile Image
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
           {/* <IconButton color="secondary">
            <CloudUploadIcon />
            </IconButton> 
          </input> */}
        </Button> 

        <Button
          style={{ marginTop: "1rem" }}
          variant="contained"
          component="label"
          fullWidth
          onClick={handleClick}
        >
          Sign Up
        </Button>
        {error != "" && <div style={{ color: "red" }}>{error}</div>}
        <div className="tnc">
          By signing up, you agree to our Terms, Conditions and Cookies policy.
        </div>
      </div>
      <div className="bottom-card">
        Already Have an account ?{" "}
        <Link href="/login">
          <span style={{ color: "blueviolet" }}>Login</span>
        </Link>
      </div>
    </div>
  )
}

export default index