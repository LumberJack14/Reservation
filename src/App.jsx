import React, { useState, useMemo } from "react";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import DropDown from "./Components/DropDown";
import TextArea from "./Components/TextArea";
import CustomButton from "./Components/CustomButton";
import styles from "Styles/style.module.css";
import { selectionOptions, reservationInitialState } from "./data";

const App = () => {
  const [data, setData] = useState(reservationInitialState);
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Пожалуйтса, выберите допустимую дату";
      }

      case "invalidDate": {
        return "Пожалуйтса, выберите допустимую дату";
      }

      case "maxTime":
      case "minTime": {
        return "Пожалуйтса, выберите допустимое время";
      }
      case "fill": {
        return "Пожалуйста, исправьте выделенные ошибки в форме";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const sendData = (e) => {
    e.preventDefault();

    if (error) {
      setError("fill");
      return;
    }

    const logInfo = {
      ...data,
      date: data.date.format("DD-MM-YYYY"),
      timeFrom: data.timeFrom.format("HH:mm"),
      timeTo: data.timeTo.format("HH:mm"),
    };
    console.log(JSON.stringify(logInfo));
  };

  const clearData = (e) => {
    e.preventDefault();
    setData(reservationInitialState);
  };

  const setNewDate = (newDate) => {
    setData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
  };

  const setTimeFrom = (newValue) => {
    setData((prevData) => ({
      ...prevData,
      timeFrom: newValue,
    }));
  };

  const setTimeTo = (newValue) => {
    setData((prevData) => ({
      ...prevData,
      timeTo: newValue,
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.back}>
        <div className={styles.colorize}>
          <form className={styles.main}>
            <div className={styles.dropdowns}>
              <h2 className={styles.title}>
                Бронирование переговорной комнаты
              </h2>
              {selectionOptions.map((option, index) => (
                <DropDown
                  key={index}
                  type={option.type}
                  name={option.name}
                  items={option.items}
                  prompt={option.prompt}
                  currentItem={data[option.type]}
                  setData={setData}
                />
              ))}
            </div>
            <div className={styles.other}>
              <DatePicker
                className={styles.datePicker}
                value={data.date}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    helperText: "DD/MM/YYYY",
                  },
                }}
                minDate={dayjs()}
                maxDate={dayjs().add(180, "day")}
                label="Выберите дату"
                views={["day"]}
                onChange={(newDate) => setNewDate(newDate)}
                onError={(newError) => setError(newError)}
              />
              <div className={styles.timePickersContainer}>
                с
                <TimePicker
                  className={styles.timePicker}
                  ampm={false}
                  minTime={dayjs()
                    .set("hour", 7)
                    .set("minute", 0)
                    .set("second", 0)}
                  maxTime={dayjs()
                    .set("hour", 22)
                    .set("minute", 0)
                    .set("second", 0)}
                  value={data.timeFrom}
                  onChange={(newValue) => setTimeFrom(newValue)}
                  onError={(newError) => setError(newError)}
                />
                до
                <TimePicker
                  className={styles.timePicker}
                  ampm={false}
                  value={data.timeTo}
                  minTime={data.timeFrom.add(30, "minute")}
                  maxTime={dayjs().set("hour", 23).set("minute", 0)}
                  onChange={(newValue) => setTimeTo(newValue)}
                  onError={(newError) => setError(newError)}
                />
              </div>
              <TextArea
                value={data.comment}
                setData={setData}
                placeholder="Это поле может быть пустым..."
                label="Комментарий к бронированию"
                type="comment"
                maxLength={200}
              />
              {error && <div className={styles.error}>{errorMessage}</div>}
              <div className={styles.buttons}>
                <CustomButton
                  value="Отправить"
                  backgroundColor="white"
                  onClick={sendData}
                />
                <CustomButton
                  value="Очистить"
                  backgroundColor="#cfccce"
                  onClick={(e) => clearData(e)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default App;
