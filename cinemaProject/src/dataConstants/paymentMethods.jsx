import { Circle, Triangle, CreditCard, RussianRuble } from "lucide-react";
import { SbpIcon } from "./Icons_bank/SbpIcon";
import { SberIcon } from "./Icons_bank/SberIcon";

//Массив способа оплаты
export const paymentMethods = [
  {
    id: "sber",
    title: "SberPay",
    icon: (
      <SberIcon
        size="clamp(1.3rem, 3.6vw, 3.2rem)"
        color="#22c55e"
        fill="#22c55e"
      />
    ),
  },
  {
    id: "sbp",
    title: "СБП",
    icon: (
      <SbpIcon
        size="clamp(1.3rem, 3.6vw, 3.2rem)"
        color="#eab308"
        fill="#eab308"
      />
    ),
  },
  {
    id: "card",
    title: "Банковская карта",
    icon: <CreditCard size="clamp(1.3rem, 3.6vw, 3.2rem)" color="#3b82f6" />,
  },
  {
    id: "crypto",
    title: "Цифровой рубль",
    icon: <RussianRuble size="clamp(1.3rem, 3.6vw, 3.2rem)" color="#eab308" />,
  },
];
