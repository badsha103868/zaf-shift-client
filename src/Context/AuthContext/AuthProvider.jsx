import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';


 const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
  // user state
  const [user, setUser]=useState(null);
  const [loading, setLoading]=useState(true);



  
   
  // register user
  const registerUser = (email, password)=>{
     setLoading
    return createUserWithEmailAndPassword(auth, email, password)
  } 

  // sign in 
  const signInUser = (email, password)=>{
     setLoading
    return signInWithEmailAndPassword(auth, email, password)
  }

  // google sign in
  const googleSignIn =()=>{
    setLoading
    return signInWithPopup(auth, googleProvider)
  }
    
  // log out
  const logOut =()=>{
    setLoading
    return signOut(auth)
  }


  // observer user state
   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
        setLoading(false)
      })
      return ()=>{
        unsubscribe();
      }
   },[])

  const authInfo = {
    registerUser,
    signInUser,
    googleSignIn,
    setLoading,
    user,
    setUser,
    loading,
    logOut,



  }

  return (
    <AuthContext value={authInfo}>
       {children}
    </AuthContext>
  );
};

export default AuthProvider;