import { uuidv4 } from '@firebase/util';

import { Button, Input } from '@mui/material'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';

function Comment({userData, postData}) {
    const [comment,setComment]=useState('');
    const handleComment= async()=>{
        let uid=uuidv4();
        const commentObj={
            text:comment,
            userDP:userData.downloadURL,
            userName:userData.fullName,
            commentUid:uid,
            postId:postData.postId,
        }
       await setDoc(doc(db,"comments",uid),commentObj);//making a collection called commentObj
        //now we have to update the posts collection by pushing the commentid in its comment array
        await updateDoc(doc(db,"posts",postData.postId),
        {
            comments:arrayUnion(uid)
        }
        )
        setComment('');
    }
  return (
    <div className='comment-post-btn' style={{width:"100%"}}>

<Input type='text' value={comment} placeholder='Add a comment...' onChange={(e)=>setComment(e.target.value)}>Add a comment...</Input>
<Button onClick={handleComment}>Post</Button>

    </div>
  )
}

export default Comment