import { View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  Text,
} from "react-native-paper";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { useFetch } from "../../../Hooks/useFetch";
import { ICity, IPlace } from "../../../utils/types";
import {
  CardContainer,
  CardContentContainer,
  LoadingWrapper,
} from "../../../styles/GlobalStyles";
import * as Styles from "./styles";
import { api } from "../../../services/api";
import Toast from "react-native-toast-message";
import { PlaceDetailsProps } from "../../../routes/place";

export const PlaceDetails = ({ navigation, route }: PlaceDetailsProps) => {
  const { historyId } = useHistoryContext();
  const { id } = route.params;
  const { data: placeDetails, loading } = useFetch<IPlace>({
    route: `/place/${historyId}/${id}`,
  });

  const handleDelete = async () => {
    await api
      .delete(`/place/${historyId}/${id}`)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Lugar apagada com sucesso",
        });
        navigation.navigate("PlaceList");
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Impossivel realizar a ação",
        });
      });
  };

  return (
    <Styles.BodyContainer>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      {!loading && placeDetails && (
        <View>
          <Styles.Header>
            <Text variant="headlineMedium">{placeDetails.name}</Text>
            <Styles.ActionButton>
              <Button onPress={handleDelete}>
                <Icon size={25} source="trash-can-outline" />
              </Button>
              <Button onPress={() => ""}>
                <Icon size={25} source="pencil" />
              </Button>
            </Styles.ActionButton>
          </Styles.Header>
          <Styles.InfoContainer>
            <Text variant="bodyMedium">{placeDetails.description}</Text>
          </Styles.InfoContainer>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Cidade</Text>
            {/* <Text variant="bodyMedium">{placeDetails.city.name}</Text> */}
          </Styles.SectionContainer>
        </View>
      )}
    </Styles.BodyContainer>
  );
};
