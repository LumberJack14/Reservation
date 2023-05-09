import React from "react";

import styles from "./styles/CustomButton.module.css";

const CustomButton = ({ value, backgroundColor }) => {
  return (
    <button className={styles.btn} style={{ backgroundColor: backgroundColor }}>
      {value}
    </button>
  );
};

export default CustomButton;
