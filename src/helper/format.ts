import { checkAndConvertColor } from "./colors";
import * as Constants from "expo-constants";

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

  const assetURL = (url: string) => {
    return `${Constants.default.expoConfig?.extra?.api}/${url
      .split("\\")
      .join("/")}`;
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

  const date = (value: string, mode: "time" | "date" = "date") => {
    const result =
      mode === "time"
        ? `${new Date(value).getHours()}:${new Date(value).getMinutes()}`
        : new Date(value).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
    return result;
  };

  function checkDate(date: string) {
    const currentDate: any = new Date();
    const inputDate: any = new Date(date);

    const diffTime = Math.abs(currentDate - inputDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays === 1) {
      return "Ontem";
    } else if (diffDays === 2) {
      return "Antes de Ontem";
    } else {
      return date;
    }
  }

  return {
    checkDate,
    date,
    colorHex,
    time,
    state,
    amount,
    assetURL,
  };
};
