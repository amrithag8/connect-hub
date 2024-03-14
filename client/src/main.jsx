import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css';
import {BrowserRouter} from "react-router-dom";
import  { UserProvider } from './Contexts/UserContext.jsx';
import PostsProvider from './Contexts/PostsContext.jsx';
import { MessageProvider } from './Contexts/MessageContext.jsx';
import { StoryProvider } from './Contexts/StoryContext.jsx';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <PostsProvider>
      <MessageProvider>
        <StoryProvider>

    <BrowserRouter>
    <App />
    {/* <ToastContainer /> */}
    </BrowserRouter>
    </StoryProvider>
    </MessageProvider>
    </PostsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
