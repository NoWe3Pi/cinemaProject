//Кастомный Хук-Мозг

import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Armchair, CreditCard, RussianRuble } from "lucide-react";

import { initial as bookingInitData } from "./dataConstants/bookingInitData";
//SELECT_SEAT -- клик на кресло
function reducer(state, action) {
  switch (action.type) {
    case "SELECT_SEAT":
      return {
        ...state,
        seats: state.seats.map((seat) =>
          seat.id === action.payload.id && seat.status === "свободно"
            ? { ...seat, status: "выбрано" }
            : seat,
        ),
      };
    //RELEASE_SEAT - смена состояния,  снять бронь с одного конкретного сиденья и сделать его снова доступным для выбора
    case "RELEASE_SEAT":
      return {
        ...state,
        seats: state.seats.map((seat) =>
          seat.id === action.payload.id
            ? { ...seat, status: "свободно" }
            : seat,
        ),
      };
    case "RESER_PLACE":
      return {
        ...state,
        seats: state.seats.map((seat) =>
          seat.status === "выбрано" ? { ...seat, status: "занято" } : seat,
        ),
      };

    default:
      return state;
  }
}

export function useBooking() {
  //Инпут
  const [nameInput, setNameInput] = useState("");
  //ДЛЯ ОКНА ПОСЛЕ КЛИКА НА ОПЛАТИТЬ
  const [paynow, setPaynow] = useState(false);

  //Модальное окно
  const [isModalActive, setIsModalActive] = useState(false);

  const [sberMethod, setSberMethod] = useState("sber");

  const [state, dispatch] = useReducer(reducer, bookingInitData);

  //РЕФЫ. Для инпута, чтобы связать с кнопкой и сделать автофокус
  const inputRef = useRef(null);
  //создаем ключ current с пустым объектов внутри для наполнения разными таймерами
  const timersRef = useRef({});

  const selectedSeat = state.seats.filter((seat) => seat.status === "выбрано");

  const closeSeat = state.seats.filter((seat) => seat.status === "занято");

  //Цена выбранного места.Сумма в интерактивном меню  экрана(1) мест
  const totalPrice = selectedSeat.reduce(
    (total, soul) => total + soul.price,
    0,
  );

  const handleFocus = useCallback((e) => {
    setNameInput(e.target.value.toLowerCase());
  }, []);

  const returnNow = useCallback(() => {
    setPaynow(false);
    setNameInput("");
    dispatch({ type: "RESER_PLACE" });
  }, [dispatch]);

  useEffect(() => {
    console.log(selectedSeat.length);

    //Вызываю при 1 элементе после фильтрации (самый первый клик по кино-месту), Эффект скролла
    if (selectedSeat.length === 1 && closeSeat.length === 0) {
      setTimeout(() => {
        window.scrollTo({
          //top: document.body.scrollHeight, -----«Прокрути страницу в самый её конец, до последнего доступного пикселя».• А так как за долю секунды до этого применился padding-bottom, этот «самый конец» будет идеально рассчитан с учетом высоты новой всплывающей панели.

          top: document.body.scrollHeight,

          //behavior: "smooth" - • По умолчанию браузер прыгает на нужную координату мгновенно и резко (это называется auto). Значение 'smooth' (англ. плавный) заставляет страницу прокручиваться мягко, с красивой и плавной кинематической анимацией, которая не пугает пользователя и выглядит очень профессионально.

          behavior: "smooth",
        });
      }, 150); // Небольшая задержка, чтобы браузер успел применить padding-bottom к верстке
    }

    // Вызываем перебор для запуска таймеров. метод forEach() ничего не возвращает
    selectedSeat.forEach((soul) => {
      if (!timersRef.current[soul.id]) {
        timersRef.current[soul.id] = setTimeout(() => {
          dispatch({ type: "RELEASE_SEAT", payload: { id: soul.id } });

          delete timersRef.current[soul.id];
        }, 100000);
      } else {
        console.log("Таймер уже работает для", soul.id);
      }
    });

    return () => {
      for (const id in timersRef.current) {
        let timerDel = timersRef.current[id]; //например, timersRef.current[id] теперь просто число 45 из памяти таймера setTimeout
        clearTimeout(timerDel); // clearTimeout(45)
      }

      timersRef.current = {}; //это обнуление от ключей-значений
      //Браузерные таймеры мы успешно выключили, они больше не тикают. Но в самом объекте timersRef.current мертвым грузом навсегда останутся лежать старые ключи: { '7': 105, '3': 106 }.
    };
  }, [state.seats, selectedSeat]); // Следим за всем массивом мест!

  return {
    state,
    dispatch,
    selectedSeat,
    isModalActive,
    setIsModalActive,
    nameInput,
    setNameInput,
    inputRef,
    handleFocus,
    returnNow,
    sberMethod,
    setSberMethod,
    paynow,
    setPaynow,
    totalPrice,
  };
}
