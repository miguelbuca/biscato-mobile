import { checkAndConvertColor } from "./colors";

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

  const state = (value?: string) => {
    if (!value) return;
    return {
      ACTIVE: "ATIVO",
      INACTIVE: "INATIVO",
      AWAY: "AUSENTE",
      AVAILABLE: "DISPONÍVEL",
      BUSY: "OCUPADO",
      OFFLINE: "OFFLINE",
      ONLINE: "ONLINE",
      ON_HOLD: "ONLINE",
      IN_PROGRESS: "EM ANDAMENTO",
      COMPLETED: "CONCLUÍDO",
      PENDING: "PENDENTE",
      PAUSED: "PAUSADO",
      UNDECIDED: "INDECISO",
      IN_PROCESS: "EM PROCESSO",
      UNDER_REVIEW: "EM REVISÃO",
      CANCELED: "CANCELADO",
      BLOCKED: "BLOQUEADO",
      RELEASED: "LIBERADO",
      UNDER_MAINTENANCE: "EM MANUTENÇÃO",
    }[value];
  };

  const colorHex = (value: string) => checkAndConvertColor(value);

  return {
    colorHex,
    time,
    state,
    amount,
  };
};
