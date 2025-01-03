import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // create user
    const handleCreateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in user
    const handleSignInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // signout user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // update User Profile

    const updateUserProfile = (profileData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profileData)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            if (currentUser?.email) {
              const user = {email: currentUser?.email};
              axios.post(`https://peer-learn-academy-server.vercel.app/jwt`, user, {
                withCredentials: true
              })
              .then(res => {
                setLoading(false);
              })  
            }
            else{
                axios.post('https://peer-learn-academy-server.vercel.app/logout', {}, {
                    withCredentials: true
                })
                .then(res => {
                    setLoading(false);
                })

            }
           
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const info = {
        user,
        setUser,
        loading,
        setLoading,
        handleCreateUser,
        handleSignInUser,
        signInWithGoogle,
        signOutUser,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;