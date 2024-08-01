import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { FlatList } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import {
  CardContainer,
  CardContentContainer,
  Container,
  LoadingWrapper,
} from "../../../styles/GlobalStyles";
import { useFetch } from "../../../Hooks/useFetch";
import { ICity, IPlace } from "../../../utils/types";
import * as Styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { cityScreenNavigationProp } from "../../../routes/city";
import { placeScreenNavigationProp } from "../../../routes/place";

export const PlaceList = ({ navigation }: placeScreenNavigationProp) => {
  const { historyId } = useHistoryContext();
  const { data, loading, refetch } = useFetch<IPlace[]>({
    route: `/place/${historyId}`,
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
                navigation.navigate("PlaceDetails", { id: item.id })
              }
            >
              <Card.Title title={item.name} />
              <Card.Content>
                <CardContentContainer>
                  <Text>{item.description}</Text>
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
        onPress={() => navigation.navigate("PlaceCreate")}
      />
    </Container>
  );
};
