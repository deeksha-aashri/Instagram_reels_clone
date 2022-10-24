import React, { useEffect, useState } from 'react'
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'; import { border } from '@mui/system';
import { Button, Divider} from '@mui/material';
import Dialog from "@mui/material/Dialog";
import Typography from '@mui/material/Typography';
import Comment from './Comment';
import DisplayCommentCard from './DisplayCommentCard';


function Post({ postData, userData }) {
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);
  const[follow, setFollow]=useState(false);
  // const [followers,setFollowers]=useState(false);
  
  useEffect(() => {
    if (postData.likes.includes(userData?.uid)) {
      setLike(true);
    }
    else {
      setLike(false);
    }
  }, [postData])

  const handleLike = async () => {
    if (like) {//to unlike a post
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayRemove(userData.uid)
      })
    }
    else {//to like a post
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayUnion(userData.uid)
      })
    }
  }
  console.log("PostData is ", postData);

useEffect(()=>{
  if(userData?.following?.includes(postData.uid)){
    setFollow(true);
  }
  else{
    setFollow(false);
  }
},[userData])
    
    const handleFollow=async()=>{
      console.log("in follow")
     
       await updateDoc(doc(db,"users",postData.uid),{
          followers:arrayUnion(userData.uid)
         }
        )
         await updateDoc(doc(db,"users",userData.uid),{
          following:arrayUnion(postData.uid)
        }
        )
      
      
    }
    const handleUnFollow= async()=>{

      console.log("handling unfollow");
     
        // setFollow(false);
       await updateDoc(doc(db,"users",postData.uid),{
          followers:arrayRemove(userData.uid)
         }
        )
        await updateDoc(doc(db,"users",userData.uid),{
          following:arrayRemove(postData.uid)
        }
        )
      
    

     
    }
  
  
    const handleClickOpen = () => {
    console.log("dialog opened");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("dialog closed");
    setOpen(false);
  };
  return (


    <div className='post-container'>
      <div className='top'>
        <Avatar
          alt="Remy Sharp"
          src={postData.profilePhotoURL}
          sx={{ margin: "1.5rem" }}
        />
        <p>{postData.profileName}</p>
      </div>

      <video autoPlay controls muted src={postData.postURL} />

      <div className='like-comment'>
        <span className='icons'>
          {
            like ?
              <FavoriteIcon onClick={handleLike} style={{ color: "red", marginRight: "1rem" }} />
              :
              <FavoriteBorderIcon onClick={handleLike} style={{ marginRight: "1rem" }} />
          }

          <ChatBubbleOutlineOutlinedIcon onClick={handleClickOpen} />
        </span>
        <div className='like-name' >
          {
            postData.likes.length > 1 ?
              <p >{postData.likes.length} likes</p>
              :
              <p> {postData.likes.length} like</p>

          }
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="md"
          >
            <div className="modal-container">
              <div className="video-modal">
                <video autoPlay={true} controls muted src={postData.postURL} />
              </div>
              <div className="comments-modal">
                <div className='upper' >
                  <span className='postCreator'>
                    <Avatar
                      alt="Remy Sharp"
                      src={postData.profilePhotoURL}
                   
                    /> &nbsp;
                    <p>{postData.profileName}</p>&nbsp;
                    {
                      follow ?
                      (
                        <Button  size='small'  
                         onClick={handleUnFollow} sx= {{ marginLeft:"9rem", marginInlineEnd:"2rem" }}>Unfollow</Button>
                      )
                        :
                        (
                          <Button  size='small' onClick={handleFollow} sx={{marginLeft:"9rem", marginInlineEnd:"2rem"}}>Follow</Button>
                        )
                        
                    }
                  </span>
                  <Divider/>
                  <DisplayCommentCard postData={postData} userData={userData}  />

                </div>
                <div className='lower' >
                  <Typography>{ postData.likes.length == 0 ?
                    'Be the first one to like this post'
                    :
                    `Liked by ${postData.likes.length} people`
                  }
                  </Typography>

                  <span>{
                    like ?
                      <FavoriteIcon onClick={handleLike} style={{ color: "red", marginRight: "1rem" }} />
                      :
                      <FavoriteBorderIcon onClick={handleLike} style={{ marginRight: "1rem" }} />
                  } <Comment userData={userData} postData={postData} /></span>
                </div>
              </div>
            </div>
          </Dialog>

          <p style={{marginTop:"1rem"}}>{postData.profileName}</p>
          <Divider sx={{marginTop:"1rem"}} />
          <div className='last-sec'>
            <Comment userData={userData} postData={postData} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Post