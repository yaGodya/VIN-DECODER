import React, { createContext, useState, useContext } from "react";

const ResultContext = createContext();

export const useResult = () => useContext(ResultContext);

export const ResultProvider = ({ children }) => {
    const [result, setResult] = useState(null);

    return (
        <ResultContext.Provider value={{ result, setResult }}>
            {children}
        </ResultContext.Provider>
    );
};
