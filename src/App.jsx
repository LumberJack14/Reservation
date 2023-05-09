import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import DropDown from "./DropDown";
import TextArea from "./TextArea";
import CustomButton from "./CustomButton";
import styles from "./styles/style.module.css";

const App = () => {
  const [data, setData] = useState({
    tower: "А",
    floor: 3,
    room: 1,
    date: Date(),
    comment: "",
  });

  console.log(data);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className={styles.main}>
        <div className={styles.dropdowns}>
          <DropDown
            items={["Башня А", "Башня Б"]}
            prompt="Выберите башню"
            type="tower"
            setData={setData}
          />
          <DropDown
            items={Array.from(Array(25).keys(), (x) => `Этаж ${x + 3}`)}
            prompt="Выберите этаж"
            type="floor"
            setData={setData}
          />
          <DropDown
            items={Array.from(Array(10).keys(), (x) => `Переговорка №${x + 1}`)}
            prompt="Выберите переговорную команту"
            type="room"
            setData={setData}
          />
        </div>
        <div className={styles.other}>
          <DatePicker defaultValue={dayjs(Date())} />
          <TextArea />
          <div className={styles.buttons}>
            <CustomButton value="Отправить" backgroundColor="white" />
            <CustomButton value="Очистить" backgroundColor="grey" />
          </div>
        </div>
      </form>
    </LocalizationProvider>
  );
};

export default App;
