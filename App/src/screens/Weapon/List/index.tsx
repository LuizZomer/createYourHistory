import { useFetch } from "../../../Hooks/useFetch";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { ActivityIndicator, Card } from "react-native-paper";
import { IWeapon } from "../../../utils/types";
import { View } from "react-native";
import { CardContainer, LoadingWrapper } from "../../../styles/GlobalStyles";

export const WeaponList = () => {
  const { historyId } = useHistoryContext();
  const { data, loading, refetch } = useFetch<IWeapon[]>({
    route: `/weapon/${historyId}`,
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
