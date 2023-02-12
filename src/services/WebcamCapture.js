import React, {useCallback, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";

//styles
import './WebcamCapture.css'

const videoSettings =  {
    width: 250,
    height: 400,
    facingMode: "user"
}

function WebcamCapture () {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('/preview');
    }, [webcamRef, navigate, dispatch])



    return (
        <div className="webcamCapture">


            <Webcam 
            audio={false}
            height={videoSettings.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoSettings.width} 
            videoConstraints={videoSettings}/>

            <RadioButtonUncheckedIcon className='webcamCapture__btn' onClick={capture} fontSize="large"/>

        </div>
    )
}

export default WebcamCapture