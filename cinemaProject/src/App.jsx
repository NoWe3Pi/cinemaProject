//Внешние библиотеки./Импорт стилей кресла svg - функция, хранящая svg (как и CreditCard, Ruble)
import { Armchair } from "lucide-react";

//Внутренние модули
import { useBooking } from "./useBooking";
import { paymentMethods } from "./dataConstants/paymentMethods";

//Стили
import "./App.css";

export default function App() {
  const {
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
    selectedMethod,
    setSelectedMethod,
    paynow,
    setPaynow,
    totalPrice,
  } = useBooking();

  return (
    <div>
      {/* //Кинозал Оформление */}
      <main
        className="cinema-container"
        style={{ paddingBottom: selectedSeat.length > 0 ? "100px" : "0px" }}
      >
        <h2>{state.movieName}</h2>
        <div className="grid-seats">
          {state.seats.map((seat) => {
            return (
              <button
                disabled={seat.status === "disabled"}
                onClick={() => {
                  dispatch({
                    type: "SELECT_SEAT",
                    payload: { id: seat.id },
                  });
                }}
                key={seat.id}
                className={
                  seat.isVip
                    ? seat.status === "выбрано"
                      ? "seat-base vip selected"
                      : seat.status === "занято"
                        ? "seat-base vip grey-block-noActive"
                        : "seat-base vip"
                    : //Ветка если seat.isVip false (Не указать в useBokung.js в массиве объектов isVip: true у id 11)
                      seat.status === "выбрано"
                      ? "seat-base selected"
                      : seat.status === "занято"
                        ? "seat-base grey-block-noActive"
                        : "seat-base"
                }
              >
                <span className="seat-number">
                  Место {seat.isVip ? `${seat.number}, Vip` : seat.number}
                </span>
                <Armchair className="svg-seat" />
              </button>
            );
          })}
        </div>
      </main>
      {/* ---------------------------------------------------------------------------*/}
      {/* Всплывающая Панель информации */}
      <div
        className={
          selectedSeat.length > 0 ? "booking-panel active" : "booking-panel"
        }
      >
        <div className="booking-panel-content">
          <p className="booking-seats">Выбрано мест: {selectedSeat.length}</p>

          <div className="priceAndButton">
            <p className="booking-price">Итоговая цена: {totalPrice} руб.</p>
            <button
              onClick={() => {
                setIsModalActive(true);
                setTimeout(() => {
                  inputRef.current.focus();
                }, 50);
              }}
              className="booking-btn"
            >
              Далее: {totalPrice}
            </button>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------*/}
      {/* Окно  Оформления заказа со способами оплаты*/}
      <div className={isModalActive ? "modal-overlay active" : "modal-overlay"}>
        <div className="paymentPage">
          <h2>Оформление заказа</h2>
          <div className="card-option">
            {paymentMethods.map((card) => {
              return (
                <div
                  key={card.id}
                  className={
                    card.id === selectedMethod
                      ? "payment-card active"
                      : "payment-card"
                  }
                  onClick={() => setSelectedMethod(card.id)}
                >
                  <span>{card.icon}</span>
                  <p>{card.title}</p>
                </div>
              );
            })}
          </div>

          {/* noValidate- можно добавить атрибутом к форме, тогда не будет появляться ошибка отсутсвия ввода @ */}
          <form
            onSubmit={(e) => {
              e.preventDefault();

              //Помещаю состояние содержания строки input в нижнем регистре в email для проверки на содержание .ru или .com
              const email = nameInput;
              if (email.includes("yandex.ru") || email.includes("gmail.com")) {
                console.log("Успешная отправка на сервер!");
                setPaynow(true);
                setIsModalActive(false);
              } else {
                email.includes("yandex") && !email.includes(".ru")
                  ? alert("Ошибка! Почта должна содержать .ru")
                  : email.includes("gmail") && !email.includes(".com")
                    ? alert("Ошибка! Почта должна содержать .com")
                    : email === ""
                      ? alert("Ошибка: Пустое поле вводе")
                      : alert(
                          "Ошибка: Поле ввода должно содержать yandex или gmail",
                        );
              }
            }}
          >
            <input
              className="inptStl"
              type="email"
              placeholder="Введите почту"
              value={nameInput}
              onChange={handleFocus}
              ref={inputRef}
            />
            <button style={{ marginLeft: "7px" }}>Оплатить</button>
          </form>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------*/}
      {/* Окно сделанной Оплаты и возврат вначало*/}
      <div
        className={paynow ? "modal-overlay active" : "modal-overlay"}
        style={paynow ? { transition: "none" } : {}}
      >
        <h2>Спасибо за заказ!</h2>
        <button onClick={returnNow}>Вернуться в зал</button>
      </div>
    </div>
  );
}
