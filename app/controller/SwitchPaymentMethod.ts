import { useBetterState } from "@/src/hooks/useBetterState";

export const SwitchPaymentMethoController = () => {
  const selectedType = useBetterState<PaymentMethodType>("credit_card");

  const methods: PaymentMethod[] = [
    {
      name: "Cartão de crédito ou débito",
      type: "credit_card",
      description:
        "Proporciona uma ampla gama de opções de pagamento, incluindo cartões de crédito e débito como Visa, MasterCard, American Express além de métodos de pagamento eletrônico populares.",
      onPress() {
        handlerPaymentType("credit_card");
      },
    },
    {
      name: "Referência",
      type: "reference",
      description:
        "O pagamento por Referência é um método de pagamento pós-pago em que um código numérico é gerado e pode ser pago através do ATM ou do Multicaixa Express com cartão de débito ou em outro lugar, através do internet banking.",
      onPress() {
        handlerPaymentType("reference");
      },
    },
  ];

  const handlerPaymentType = (type: PaymentMethodType) =>
    (selectedType.value = type);

  return { methods, selectedType };
};
