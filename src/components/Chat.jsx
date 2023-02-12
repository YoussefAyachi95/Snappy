import React from 'react'
import ReactTimeago from 'react-timeago';
import { useDispatch } from "react-redux";
import { selectImage } from '../features/appSlice';
import { data } from '../firebase/firebase';
import {useNavigate} from "react-router-dom";

//styles
import './styles/Chat.css'
import { Avatar } from '@mui/material'
import StopRoundedIcon from '@mui/icons-material/StopRounded';

function Chat({id, username, timestamp, read, imageUrl, profilePic}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const open = () => {
        if (!read){
            dispatch(selectImage(imageUrl));
            data.collection('posts').doc(id).set({
                read: true,
            }, {merge: true});

            navigate('/chats/view')
        }
    }

  return (
    <div onClick={open} className='chat'>
        <Avatar src={profilePic} className='chat__avatar'/>
        <div className='chat__info'>
            <h4>{username}</h4>
            <p>
                {!read && 'Tap to view -'}{" "} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/>
            </p>
        </div>

        {!read && <StopRoundedIcon className='chat__readIcon'/>}
    </div>
  )
}

export default Chat