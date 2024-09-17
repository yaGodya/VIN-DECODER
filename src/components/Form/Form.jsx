import React, { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Form.module.css";
import { useResult } from "../../Utils/Hooks/useResult"; 

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;

function Form({ onSuccess, selectedVin, history, onHistoryClick }) {
    const { result, setResult } = useResult(); 
    const [vin, setVin] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedVin) {
            setVin(selectedVin);
            fetchVinData(selectedVin);
        }
    }, [selectedVin]);

    const fetchVinData = async (vinCode) => {
        setResult(null);
        setError("");
        setVin("");

        try {
            const response = await fetch(
                `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vinCode}?format=json`
            );
            const data = await response.json();

            if (data.Results && data.Results.length > 0) {
                setResult(data.Results);
                onSuccess(vinCode);
            } else {
                setError("VIN not found.");
                setTimeout(() => setError(""), 3000);
            }
        } catch (error) {
            setError("API connection error. Please try again later.");
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (vin.trim() === "") {
            setError("VIN field cannot be empty.");
            setResult(null);
            setTimeout(() => setError(""), 3000);
            return;
        }

        if (!VIN_REGEX.test(vin)) {
            setError("Invalid VIN format. Please check your input.");
            setResult(null);
            setTimeout(() => setError(""), 3000);
            return;
        }

        fetchVinData(vin);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="vin" className={styles.label}>
                            Enter VIN
                        </label>

                        <div className={styles.inputContainer}>
                            <input
                                className={styles.input}
                                type="text"
                                id="vin"
                                value={vin}
                                onChange={(e) => setVin(e.target.value)}
                                maxLength="17"
                                placeholder="1HGCM82633A123456"
                            />

                            <button type="submit" className={styles.button}>
                                Decode VIN
                            </button>
                        </div>

                        <div className={styles.errorContainer}>
                            {error && <ErrorMessage message={error} />}
                        </div>
                    </form>

                    <div className={styles.historyContainer}>
                        <h2 className={styles.historyTitle}>Last 3 Queries:</h2>

                        {history.length > 0 ? (
                            <ul className={styles.historyList}>
                                {history.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => onHistoryClick(item)}
                                        className={styles.historyItem}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recent queries.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
