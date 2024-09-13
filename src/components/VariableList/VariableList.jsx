import React from "react";
import { Link } from "react-router-dom";
import styles from "./VariableList.module.css"; 

const VariableList = ({ variables }) => {
    return (
        <ul className={styles.list}>
            {variables.map((variable) => (
                <li key={variable.ID} className={styles.listItem}>
                    <span className={styles.gridItemBold}>
                        <Link
                            to={`/variables/${variable.ID}`}
                            className={styles.link}
                        >
                            {variable.Name}
                        </Link>
                    </span>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: variable.Description,
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};

export default VariableList;
