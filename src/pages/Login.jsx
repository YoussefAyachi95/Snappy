import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { auth, provider } from '../firebase/firebase';
import { login } from '../features/appSlice';

//styles
import './styles/Login.css'

function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }))
        }).catch((error) => { 
            throw new Error(error.message)
        })
    }
 
  return (
    <div className='login'>
        <div className='login__container'>
            <h1>Snappy</h1>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" width="250" height="250" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"></path>
        </svg>
        <Button variant='outlined' onClick={signIn}>Sign In</Button>
        </div>
    </div>
  )
}

export default Login