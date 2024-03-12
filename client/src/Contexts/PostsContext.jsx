import React, { createContext, useState } from "react";

export const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState();
  const [viewpost, setViewpost] = useState([]);
  const [changePost, setChangePost] = useState(false);
  const [triggerViewpost, setTriggerViewpost] = useState(false);
  const [loaded, setLoaded] = useState();
  const [triggerPost, setTriggerPost] = useState(false);
  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        editedPost,
        setEditedPost,
        viewpost,
        setViewpost,
        changePost,
        setChangePost,
        triggerViewpost,
        setTriggerViewpost,loaded, setLoaded, triggerPost, setTriggerPost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;
