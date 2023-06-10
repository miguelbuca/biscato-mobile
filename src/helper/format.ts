export const format = () => {
  const amount = (value: number) => {
    const options = {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol",
    };

    const formattedValue = new Intl.NumberFormat("pt-AO", options).format(
      value
    );

    return formattedValue || "-";
  };

  const time = (value?: string) => {
    if (!value) return;
    return {
      HOUR: "Horas",
      DAY: "Diário",
      WEEK: "Semanal",
      MONTH: "Mensal",
      YEAR: "Anual",
    }[value];
  };

  return {
    time,
    amount,
  };
};
