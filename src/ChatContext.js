// JavaScript source code
import { useContext } from "react";
import { createContext, useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
//const [currentUser, setCurrentUser] = useState({});

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state,action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatID:
                        currentUser.uid > action.payload.uid ?
                            currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data:state, dispatch }} >
            {children}
        </ChatContext.Provider>
    );
};