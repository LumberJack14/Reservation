import React from "react";

const TextArea = ({ text, placeholder, label }) => {
  const handleChange = e => {};

  return (
    <>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      ></textarea>
    </>
  );
};

export default TextArea;
