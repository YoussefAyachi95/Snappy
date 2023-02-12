import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebcamCapture from './services/WebcamCapture';
import Preview from './pages/Preview';
import Chats from './pages/Chats';
import ChatView from './pages/ChatView';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase/firebase';

//styles
import './App.css';

function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      } else {
        dispatch(logout())
      } 
    })
  }, [])

  return (
    <div className="App">
     <BrowserRouter>
      {!user ? ( <Login /> ): (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" height="100" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118"></path>
        </svg>
        <div className="app__body">
          <div className='app_bodyBackground'>
            <Routes>
             <Route path="/" element={<WebcamCapture />} />
             <Route path="/preview" element={<Preview />} />
             <Route path="/chats" element={<Chats />} />
             <Route path="/chats/view" element={<ChatView />} />
          </Routes>
          </div>
      </div>
      </>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
