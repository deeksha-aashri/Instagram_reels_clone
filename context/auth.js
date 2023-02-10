import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail,signOut } from 'firebase/auth';
import React, { createContext , useState, useEffect} from 'react'
import {auth} from '../firebase';

export const AuthContext=createContext('');
function Authwrapper({children}) {
  const [user, setUser] = useState('');
  const [loading, setLoading] =useState(true);

  console.log("in auth wrapper ");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged called" );
      if (user) {
        setUser(user);
      }
      else {
         setUser('');
      }
    })
    setLoading(false);
  },[])
  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout(){
    return signOut(auth);
  }
  function forgetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function signup(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
  }
  const store={
    login,
    user,
    logout,
    forgetPassword,
    signup
  
  };
  return (
    <AuthContext.Provider value={store}>
       { !loading && children}
    </AuthContext.Provider>
   
  )
}

export default Authwrapper;


