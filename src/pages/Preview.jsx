import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { selectCameraImage, resetCameraImage } from "../features/cameraSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid} from "uuid"
import { storage, data } from "../firebase/firebase";
import firebase from 'firebase'
import { selectUser } from "../features/appSlice";

//styles
import './styles/Preview.css'
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';


function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!cameraImage){
            navigate("/", { replace: true })
        }

    }, [cameraImage, navigate]);

    const closePreview = () => {
        dispatch(resetCameraImage());
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");

        uploadTask.on('state_changed', null, (error) => {
            console.log(error)
        }, () => {
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                data.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                navigate("/chats", { replace: true })
            })
        })
    }


    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview__close"/>
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendIcon"/>
            </div>
        </div>
    )
}

export default Preview