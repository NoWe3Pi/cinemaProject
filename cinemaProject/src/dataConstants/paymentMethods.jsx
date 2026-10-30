import { CreditCard, RussianRuble } from "lucide-react";

//Массив способа оплаты
export const paymentMethods = [
  { id: "sber", title: "SberPay", icon: "🟢" },
  { id: "sbp", title: "СБП", icon: "⚡" },
  {
    id: "card",
    title: "Банковская карта",
    icon: <CreditCard size={15} color="#3b82f6" />,
  },
  {
    id: "crypto",
    title: "Цифровой рубль",
    icon: <RussianRuble size={15} color="#eab308" />,
  },
];
