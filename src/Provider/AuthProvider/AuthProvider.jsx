import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';

const GoogleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // For SignIn with Google 
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider)
    }

    const signOutUser = () => {
        return signOut(auth)

    }

    const UpdatedUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
            setLoading(false)

        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authData = {
        user,
        setUser,
        createUser,
        signInUser,
        signOutUser,
        UpdatedUser,
        loading,
        setLoading,
        signInWithGoogle,
        forgetPassword
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;