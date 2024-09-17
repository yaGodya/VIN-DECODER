import React, { useState } from "react";
import Form from "../../components/Form/Form";
import useVinHistory from "../../Utils/Hooks/useVinHistory";
import styles from "./Home.module.css";
import Result from "../../components/Result/Result"; // Импорт нового компонента

const Home = () => {
    const { history, addToHistory } = useVinHistory();
    const [selectedVin, setSelectedVin] = useState(null);

    const handleHistoryClick = (vin) => {
        setSelectedVin(vin);
    };

    return (
        <div className={styles.home}>
            <Form
                onSuccess={addToHistory}
                selectedVin={selectedVin}
                history={history}
                onHistoryClick={handleHistoryClick}
            />
            <Result /> 
        </div>
    );
};

export default Home;
