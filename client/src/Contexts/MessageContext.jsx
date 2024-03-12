import { createContext, useState } from "react"

export const MessageContext=createContext();
export const MessageProvider=({children})=>{
    const [messageOpen, setMessageOpen] = useState(false);

  const [receivedmsg, setReceivedmsg] = useState([]);
  const [message, setMessage] = useState("");
  const [unReadCount, setUnReadCount] = useState(0);


    return(<MessageContext.Provider value={{messageOpen, setMessageOpen, receivedmsg, setReceivedmsg,message, setMessage, unReadCount, setUnReadCount }}>{children}</MessageContext.Provider>)
}
