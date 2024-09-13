import React, { useState, useEffect } from "react";
import VariableList from "../../components/VariableList/VariableList";
import styles from "./Variables.module.css";

const fetchVariablesData = async () => {
    try {
        const response = await fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json"
        );
        const data = await response.json();
        return data.Results;
    } catch (error) {
        console.error("Error fetching variables:", error);
        throw new Error("Failed to load variables.");
    }
};

const Variables = () => {
    const [variables, setVariables] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVariables = async () => {
            try {
                const data = await fetchVariablesData();
                setVariables(data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadVariables();
    }, []);

    return (
        <div className={styles.variables}>
            <h1 className={styles.title}>List of Variables</h1>
            {error && <p className={styles.error}>{error}</p>}
            <VariableList variables={variables} />
        </div>
    );
};

export default Variables;
