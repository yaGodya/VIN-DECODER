import { useState, useEffect } from "react";

const useVinHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory =
            JSON.parse(localStorage.getItem("vinHistory")) || [];
        setHistory(storedHistory);
    }, []);

    const addToHistory = (vinData) => {
        const newHistory = [vinData, ...history].slice(0, 3);
        setHistory(newHistory);
        localStorage.setItem("vinHistory", JSON.stringify(newHistory));
    };

    return { history, addToHistory };
};

export default useVinHistory;
