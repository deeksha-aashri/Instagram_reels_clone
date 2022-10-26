import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Button } from '@mui/material';


function DisplayCommentCard({postData, userData}) {
    const [allComments,setAllComments]=useState(null);
   
    useEffect(  ()=>{
        const tempArr=[];
        postData.comments.map( async (commentuid)=>{
            let commentdata= await getDoc(doc(db,"comments",commentuid));
            tempArr.push(commentdata.data());
            setAllComments(tempArr);
        })
    },[postData])
   
  return (
    <div>
    {allComments == null ? (
      <CircularProgress color="success" />
    ) : (
      <>
        {
        
        allComments.map((commentObj,index) => {
          
          return (
            
            <div key={index}style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <Avatar src={commentObj.userDP } sx={{marginRight:"0.50rem"}} />
              <p style={{marginTop:"0.75rem", marginBottom:"0.75rem", }}>
               
                <span style={{fontWeight:"500", marginRight:"0.5rem"}}>{commentObj.userName  }</span>
               <span style={{fontWeight:"300"}}>{commentObj.text}</span> 
              </p>
            </div>
          );
        })}
      </>
    )}
  </div>
    
   

  )
}

export default DisplayCommentCard