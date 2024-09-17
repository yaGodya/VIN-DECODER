import { useState, useEffect } from "react";

const useVinHistory = () => {
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem("vinHistory");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const addToHistory = (vin) => {
        setHistory((prevHistory) => {
            const newHistory = prevHistory.filter((item) => item !== vin);
            const updatedHistory = [vin, ...newHistory].slice(0, 3);

            localStorage.setItem("vinHistory", JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    };

    useEffect(() => {
        const savedHistory = localStorage.getItem("vinHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    return { history, addToHistory };
};

export default useVinHistory;
