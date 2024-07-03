import { useContext } from "react";
import { HistoryContext } from "./HistoryContext";

export const useHistoryContext = () => {
  const historyContext = useContext(HistoryContext);

  return historyContext;
};
