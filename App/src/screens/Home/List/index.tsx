import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { api } from "../../../services/api";
import { ActivityIndicator, Card, FAB } from "react-native-paper";
import * as Styles from "./styles";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { CardContainer, LoadingWrapper } from "../../../styles/GlobalStyles";
import { useFocusEffect } from "@react-navigation/native";
import { DetailsStackParamList } from "../../../routes/history";
import { useFetch } from "../../../Hooks/useFetch";
import { IHistory } from "../../../utils/types";

type HistoriasScreenNavigationProp =
  NativeStackScreenProps<DetailsStackParamList>;

export const HistoryList = ({ navigation }: HistoriasScreenNavigationProp) => {
  const { data, loading, refetch } = useFetch<IHistory[]>({
    route: "/history",
  });
  const { setHistoryId } = useHistoryContext();

  const handleClick = (id: number) => {
    setHistoryId(id);
    navigation.navigate("historyDetails");
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <Styles.Container>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      {!loading && data && !!data.length && (
        <FlatList
          data={data}
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
