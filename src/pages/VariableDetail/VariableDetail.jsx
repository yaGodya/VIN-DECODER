import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./VariableDetail.module.css";

const VariableDetail = () => {
    const { variableId } = useParams();
    const [variableDetail, setVariableDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVariableDetail = async () => {
            try {
                const response = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/${variableId}?format=json`
                );
                const data = await response.json();
                setVariableDetail(data.Results?.[0] || null);
            } catch (error) {
                console.error("Error fetching variable details:", error);
                setVariableDetail(null);
            }
        };

        fetchVariableDetail();
    }, [variableId]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!variableDetail) {
        return (
            <div className={styles.container}>
                <button onClick={handleBackClick} className={styles.backButton}>
                    Back
                </button>
                <p className={styles.noResults}>
                    Data not found for your request.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button onClick={handleBackClick} className={styles.backButton}>
                Back
            </button>
            <div className={styles.detail}>
                <h1 className={styles.title}>
                    {variableDetail.ElementName || "Unknown Variable"}
                </h1>
                <p className={styles.description}>
                    {variableDetail.Name || "No description available"}
                </p>
            </div>
        </div>
    );
};

export default VariableDetail;
