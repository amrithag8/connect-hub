import { createContext, useState } from "react";


export const StoryContext=createContext();

export const StoryProvider=({children})=>{
    const[triggerStory, setTriggerStory]=useState(false);
    const[allStory, setAllStory]=useState([]);
    const[selectedStory, setSelectedStory]=useState();


    return(<StoryContext.Provider value={{triggerStory, setTriggerStory, allStory, setAllStory, selectedStory, setSelectedStory}}>{children}</StoryContext.Provider>)
}