import { View } from "react-native";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { useFetch } from "../../../Hooks/useFetch";
import { ICity } from "../../../utils/types";
import { ActivityIndicator, Card } from "react-native-paper";
import { CardContainer, LoadingWrapper } from "../../../styles/GlobalStyles";

export const CityList = () => {
  const { historyId } = useHistoryContext();
  const { data, loading, refetch } = useFetch<ICity[]>({
    route: `/city/${historyId}`,
  });

  return (
    <View>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      {!loading &&
        !!data.length &&
        data.map(({ id, name }) => (
          <CardContainer key={id}>
            <Card>
              <Card.Title title={name} />
            </Card>
          </CardContainer>
        ))}
    </View>
  );
};
