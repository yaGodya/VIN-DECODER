import React from "react";
import styles from "./Result.module.css";
import { useResult } from "../../Utils/Hooks/useResult"; 

const Result = () => {
    const { result } = useResult();

    if (!result || result.length === 0) return null;

    return (
        <div className={styles.result}>
            <h2 className={styles.resultTitle}>VIN Information</h2>
            <div className={styles.resultContainer}>
                {result
                    .filter((item) => item.Variable && item.Value)
                    .map((item) => (
                        <div key={item.VariableId} className={styles.gridRow}>
                            <div className={styles.gridItemBold}>
                                {item.Variable}
                            </div>
                            <div className={styles.gridItem}>{item.Value}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Result;
