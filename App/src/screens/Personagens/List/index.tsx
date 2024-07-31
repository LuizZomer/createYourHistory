import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import {
  CardContainer,
  CardContentContainer,
  Container,
  LoadingWrapper,
} from "../../../styles/GlobalStyles";
import { useFetch } from "../../../Hooks/useFetch";
import { ICharacter } from "../../../utils/types";
import * as Styles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { characterScreenNavigationProp } from "../../../routes/character";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const CharacterList = ({
  navigation,
}: characterScreenNavigationProp) => {
  const { historyId } = useHistoryContext();
  const { data, loading, refetch } = useFetch<ICharacter[]>({
    route: `/character/${historyId}`,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <Container>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardContainer key={item.id}>
            <Card
              onPress={() =>
                navigation.navigate("CharacterDetails", { id: item.id })
              }
            >
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
        onPress={() => navigation.navigate("CharacterCreate")}
      />
    </Container>
  );
};
