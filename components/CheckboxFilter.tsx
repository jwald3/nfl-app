import React, { useState } from "react";
import positions from "../data/positions.json";

import styles from "../styles/CheckboxFilter.module.css";

interface CheckboxProps {
    handleFilters: Function;
}

const Checkbox = (props: CheckboxProps) => {
    const [checked, setChecked] = useState(["QB", "RB", "WR", "TE"]);

    const handleToggle = (value: string) => {
        const currentIndex = checked.indexOf(value); // will find index or return -1 if not found
        const newChecked = [...checked]; // array needs to be changed then assigned via new var

        if (currentIndex === -1) {
            newChecked.push(value); // if index not found, add it
        } else {
            newChecked.splice(currentIndex, 1); // if index is found, remove it
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    return (
        <div className={styles.checkboxBar}>
            {positions.map((val, idx) => (
                <div className={styles.checkboxGroup} key={idx}>
                    <div
                        className={
                            checked.includes(val.abbrev)
                                ? styles.checkboxInputActive
                                : styles.checkboxInputInactive
                        }
                        onClick={() => handleToggle(val.abbrev)}
                    >
                        {val.abbrev}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Checkbox;
