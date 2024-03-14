import { Box, Divider, Stack } from "@mui/material";
import { Sidebar } from "../Components/Sidebar";
import { Newposts } from "../Components/Card";
import { Suggestions } from "../Components/Suggestions";
import "./Homepage.css";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import { PostsContext } from "../Contexts/PostsContext";

export const 


Homepage = ({
  
  
  setNotification,
  
  
  
  setMode,
  mode,
  notification,
  
  
  
  
}) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    getPostsPage();
  }, []);

  const getPostsPage = async () => {
    setIsLoading(true);
    console.log("getpostspage");
    try {
      const res = await axiosInstance(`/posts/postspage?page=${page}`);
      console.log("pageNumber", res.data);
      if (page === 1) {
        if (res.data.length > 0) {
          setItems(res.data);
          setPage(page + 1);
        }
      } else {
        if (res.data.length > 0) {
          setItems((prevItems) => [...prevItems, ...res.data]);

          setPage(page + 1);
        }
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    console.log("hi scroll");
    if (isLoading) return;
    // Return if already loading data

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // Detect end of scroll
      console.log("page num", page);
      // getPostsPage(page); // Load next page
      getPostsPage(page);
    }
  };

  useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    }
    
  }, [isLoading, page]);

  return (
    <>
      <Box id="homepage" sx={{ display: "flex" }}>
        <Box
          sx={{
            gap: "20px",
            display: { xs: "none", sm: "flex" },
            p: "15px",
          }}
        >
          <Sidebar
            mode={mode}
            setMode={setMode}
            
        
            
            notification={notification}
            
           
            
            
            
          />
          <Divider orientation="vertical" />
        </Box>
        {/* <Box sx={{marginLeft:"-16px"}}> */}
        <Newposts
          setItems={setItems}
          items={items}
          
          setNotification={setNotification}
          
         
          
        />
        {/* </Box> */}
        <Suggestions />
      </Box>
    </>
  );
};
