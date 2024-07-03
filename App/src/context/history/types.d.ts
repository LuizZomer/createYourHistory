interface IHistoryContext{
    historyId: number | null;
    setHistoryId: React.Dispatch<React.SetStateAction<number | null>>
}