import React, { useState, useRef, useEffect } from "react";

import styles from "./styles/DropDown.module.css";

const DropDown = ({ items, prompt, type, setData }) => {
  const [chosenItem, setChosenItem] = useState(items[0]);
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

    setChosenItem(item);
    setData((prevData) => ({
      ...prevData,
      [type]: type === "tower" ? item.at(-1) : parseInt(item.split(/\s№?/)[1]),
    }));
    setIsOpen(!isOpen);
  };

  return (
    <>
      <label>{prompt}</label>
      <div ref={dropDownRef} className={styles.container}>
        <button onClick={handleClick}>{chosenItem}</button>
        {isOpen && (
          <ul className={styles.itemsContainer}>
            {items.map((item, index) => {
              return (
                <li className={styles.item} key={index}>
                  <button onClick={(e) => handleSelect(e, item)}>{item}</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDown;
