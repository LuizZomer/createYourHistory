import { useEffect, useState } from "react";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { api } from "../../../services/api";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import {
  CardContainer,
  CardContentContainer,
  LoadingWrapper,
} from "../../../styles/GlobalStyles";
import { useFetch } from "../../../Hooks/useFetch";
import { ICharacter } from "../../../utils/types";

export const CharacterList = () => {
  const { historyId } = useHistoryContext();
  const { data, loading, refetch } = useFetch<ICharacter[]>({
    route: `/character/${historyId}`,
  });

  return (
    <View>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardContainer key={item.id}>
            <Card>
              <Card.Title title={item.name} />
              <Card.Content>
                <CardContentContainer>
                  <Text>{item.description}</Text>
                  <Text>Personalidade: {item.personality}</Text>
                  {item.age && <Text>Idade: {item.age}</Text>}
                </CardContentContainer>
              </Card.Content>
            </Card>
          </CardContainer>
        )}
      />
    </View>
  );
};
