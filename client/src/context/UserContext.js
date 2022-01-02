import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    //Now where using the UseState

    const [rest, setRest] = useState([]);

    // Making it Null Breaks the Code Apparently
    const [selectedrest , setSelectedrest] = useState([])

    const [selectreview, setSelectReview] = useState([])

    
    return(
        <UserContext.Provider value = {{rest, setRest , selectedrest, setSelectedrest , selectreview,  setSelectReview }}>
            {children}
        </UserContext.Provider>
    )
}