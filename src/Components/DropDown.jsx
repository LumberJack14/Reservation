import React, { useState, useRef, useEffect } from "react";

import styles from "Styles/DropDown.module.css";
import arrowIcon from "../../public/assets/arrow.svg";

const DropDown = ({ items, prompt, type, name, setData, currentItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClick = (event) => handleClickOutside(event);
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    setIsOpen(!isOpen);
  };

  const handleSelect = (e, item) => {
    e.preventDefault();

    setData((prevData) => ({
      ...prevData,
      [type]: type === "tower" ? item.at(-1) : parseInt(item.split(/\s№?/)[1]),
    }));
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.outer}>
      <label>{prompt}</label>
      <div ref={dropDownRef} className={styles.container}>
        <button className={styles.headButton} onClick={handleClick}>
          {`${name} ${type === "room" ? "№" : ""}${currentItem}`}
          <img src={arrowIcon} className={styles.icon} />
        </button>
        {isOpen && (
          <ul className={styles.itemsContainer}>
            {items.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    className={styles.item}
                    onClick={(e) => handleSelect(e, item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDown;
