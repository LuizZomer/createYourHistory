import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { api } from "../../../services/api";
import { Card } from "react-native-paper";
import * as Styles from "./styles";

export const HistoryList = () => {
  const [historyList, setHistoryList] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const reqHistory = async () => {
    await api.get("/history").then((res) => {
      setHistoryList(res.data);
    });
  };

  useEffect(() => {
    reqHistory();
  }, []);

  return (
    <Styles.Container>
      <FlatList
        data={historyList}
        renderItem={({ item }) => (
          <Card key={item.id}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </Styles.Container>
  );
};
