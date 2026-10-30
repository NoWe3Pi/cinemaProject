export const initial = {
  movieName: "Интерстеллар (Зал 1)",
  seats: [
    { id: 1, row: 1, number: 1, status: "свободно", price: 500, timerId: null },
    { id: 2, row: 1, number: 2, status: "свободно", price: 500, timerId: null },
    { id: 3, row: 1, number: 3, status: "свободно", price: 500, timerId: null },
    { id: 4, row: 1, number: 4, status: "свободно", price: 500, timerId: null },
    { id: 5, row: 1, number: 5, status: "свободно", price: 500, timerId: null },
    { id: 6, row: 2, number: 6, status: "свободно", price: 500, timerId: null },
    { id: 7, row: 2, number: 7, status: "свободно", price: 500, timerId: null },
    { id: 8, row: 2, number: 8, status: "свободно", price: 500, timerId: null },
    { id: 9, row: 2, number: 9, status: "свободно", price: 500, timerId: null },
    {
      id: 10,
      row: 2,
      number: 10,
      status: "свободно",
      price: 500,
      timerId: null,
    },
    {
      id: 11,
      row: 3,
      number: 11,
      // сделав  статус disabled - в кнопке при создании(создаются динамически перебором seats ) выполнится это проверка disabled={seat.status === "disabled"}, ести статус совпадет добавится к созданной кнопке атрибут disabled
      // status: "disabled",
      status: "свободно",
      timerId: null,
      isVip: true,
      price: 1000,
    },
  ],
};
