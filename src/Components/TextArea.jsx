import React from "react";

import styles from "Styles/TextArea.module.css";

const TextArea = ({ value, placeholder, label, setData, type, maxLength }) => {
  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [type]: e.target.value,
    }));
  };

  return (
    <>
      <label className={styles.label}>{label}</label>
      <textarea
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.textarea}
      ></textarea>
    </>
  );
};

export default TextArea;
