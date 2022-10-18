import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import user from "../assets/profileImage.png";
import { AuthContext } from "../context/auth";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ref } from "firebase/storage";
import { Button } from "@mui/material";
function Profile() {
 const {user} =useContext(AuthContext);
    const [userData,setUserData]=useState({});
    const [postId,setpostId]=useState([]);
    const [postURL,setPostURL]=useState([]);
    console.log("UserData check",userData.posts)
    
    useEffect(()=>{
      console.log(user.uid);
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        
        setUserData(doc.data());
        setpostId(doc.data().posts);
      });
      return () => {
        unsub();
      };
    }, [user]);
  //To add the uids of posts in posts state
  //Read the "posts" db
  useEffect(()=>{
    let tempArr=[];
    postId.map((postid)=>{
      const unsub=onSnapshot(doc(db,"posts",postid),(doc)=>{
        tempArr.push(doc.data().postURL);
        setPostURL([...tempArr])
      })
    })
  },[postId])
 
  
  return (

    <div style={{overflowX:"hidden"}}>
      <Navbar userData= {userData}/>
      <div>
        <div className="profile-intro">
          <div
            style={{ height: "8rem", width: "8rem", clipPath: "circle(50%)" }}
          >
            <Image  layout="fill"   src={userData?.downloadURL} />
          </div>
          <div className="biodata">
          <div className="post-followers-following">
           
           <p ><span className="bold"> {userData.posts?.length}</span > posts</p> &nbsp;&nbsp;&nbsp;
           <p> <span className="bold">{userData.followers?.length}</span> followers</p> &nbsp;&nbsp;&nbsp;
           <p><span className="bold">{userData.following?.length}</span> following</p> &nbsp;&nbsp;&nbsp;
         </div>
         <div className="user-info">
         <h4>{userData?.fullName}</h4>
          <Button variant="outlined" size="small">Edit profile</Button>
         </div>
          </div>
          
         
        </div>
       
        <hr />
        <div className="profile-posts" >
         
          {postURL.map(post=>(
            <video  autoPlay controls muted src={post}></video>
          ))}
       
        </div>
      </div>
    </div>
  );
}

export default Profile;