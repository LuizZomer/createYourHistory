import { useState } from "react";
import { HistoryContext } from "./HistoryContext";

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [historyId, setHistoryId] = useState<number | null>(null);

  return (
    <HistoryContext.Provider value={{ historyId, setHistoryId }}>
      {children}
    </HistoryContext.Provider>
  );
};
