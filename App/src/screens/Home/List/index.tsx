import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { api } from "../../../services/api";
import { ActivityIndicator, Card, FAB } from "react-native-paper";
import * as Styles from "./styles";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { CardContainer } from "../../../styles/GlobalStyles";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryStackParamList } from "../../../routes/history";

type HistoriasScreenNavigationProp =
  NativeStackScreenProps<HistoryStackParamList>;

export const HistoryList = ({ navigation }: HistoriasScreenNavigationProp) => {
  const { setHistoryId } = useHistoryContext();
  const [historyList, setHistoryList] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (id: number) => {
    setHistoryId(id);
    navigation.navigate("historyDetails");
  };

  const reqHistory = async () => {
    await api
      .get("/history")
      .then((res) => {
        setHistoryList(res.data);
      })
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      reqHistory();
    }, [])
  );

  return (
    <Styles.Container>
      {loading && <ActivityIndicator animating={true} color="purple" />}
      {!loading && !!historyList.length && (
        <FlatList
          data={historyList}
          renderItem={({ item }) => (
            <CardContainer key={item.id}>
              <Card onPress={() => handleClick(item.id)}>
                <Card.Title title={item.name} />
                <Card.Content>
                  <Text>{item.description}</Text>
                </Card.Content>
              </Card>
            </CardContainer>
          )}
        />
      )}
      <Styles.FabStyled
        icon="plus"
        color="red"
        rippleColor="red"
        background={{
          color: "red",
          borderless: false,
          radius: 0,
          foreground: true,
        }}
        onPress={() => navigation.navigate("historyCreate")}
      />
    </Styles.Container>
  );
};
