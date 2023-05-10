import React from "react";

import styles from "Styles/CustomButton.module.css";

const CustomButton = ({ value, backgroundColor, onClick }) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={styles.btn}
      style={{ backgroundColor: backgroundColor }}
    >
      {value}
    </button>
  );
};

export default CustomButton;
