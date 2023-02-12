import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { auth, data } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import {useNavigate} from "react-router-dom";
import Chat from '../components/Chat';

//styles
import './styles/Chats.css'
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { resetCameraImage } from '../features/cameraSlice';

export default function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        data.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
         setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
        ));
    }, []);



    const takeSnap = () => {
        dispatch(resetCameraImage());
        navigate('/');
    }



  return (
    <div className='chats'>
        <div className='chats__header'>
            <Avatar src={user.profilePic} onClick={() => auth.signOut()} className='chats__avatar'/>
            <div className='chats__search'>
                <SearchIcon className='chats__searchIcon' />
                <input placeholder='Friends' type='text'/>
            </div>
            <ChatBubbleIcon className='chats__chatIcon'/>   
        </div>

        <div className='chats__posts'>
            {
                posts.map(({id, data: {profilePic, username, timestamp, imageUrl, read}}) => (
                    <Chat key={id} id={id} profilePic={profilePic} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} />
                ))}
        </div>

        <RadioButtonUncheckedRoundedIcon className='chats__takePicIcon' onClick={takeSnap} fontSize='large'/>
    </div>
  )
}
