import dayjs from "dayjs";

export const selectionOptions = [
  {
    type: "tower",
    name: "Башня",
    prompt: "Выберите башню",
    items: ["Башня А", "Башня Б"],
  },
  {
    type: "floor",
    name: "Этаж",
    prompt: "Выберите этаж",
    items: Array.from(Array(25).keys(), (x) => `Этаж ${x + 3}`),
  },
  {
    type: "room",
    name: "Переговорка",
    prompt: "Выберите команту",
    items: Array.from(Array(10).keys(), (x) => `Переговорка №${x + 1}`),
  },
];

export const reservationInitialState = {
  tower: "А",
  floor: 3,
  room: 1,
  date: dayjs(),
  timeFrom: dayjs().set("hour", 7).set("minute", 0).set("second", 0),
  timeTo: dayjs().set("hour", 8).set("minute", 0).set("second", 0),
  comment: "",
};
