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
import { ICity } from "../../../utils/types";
import {
  CardContainer,
  CardContentContainer,
  LoadingWrapper,
} from "../../../styles/GlobalStyles";
import * as Styles from "./styles";
import { api } from "../../../services/api";
import Toast from "react-native-toast-message";
import { CityDetailsProps } from "../../../routes/city";

export const CityDetails = ({ navigation, route }: CityDetailsProps) => {
  const { historyId } = useHistoryContext();
  const { id } = route.params;
  const { data: cityDetails, loading } = useFetch<ICity>({
    route: `/city/${historyId}/${id}`,
  });

  const handleDelete = async () => {
    await api
      .delete(`/city/${historyId}/${id}`)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Cidade apagada com sucesso",
        });
        navigation.navigate("CityList");
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
      {!loading && cityDetails && (
        <View>
          <Styles.Header>
            <Text variant="headlineMedium">{cityDetails.name}</Text>
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
            <Text variant="bodyMedium">{cityDetails.description}</Text>
          </Styles.InfoContainer>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Lugares da cidade</Text>
            {cityDetails.place.length > 0 &&
              cityDetails.place.map(({ id, name, description }) => (
                <CardContainer key={id}>
                  <Card>
                    <Card.Title title={name} />
                    <Card.Content>
                      <CardContentContainer>
                        <Text>{description}</Text>
                      </CardContentContainer>
                    </Card.Content>
                  </Card>
                </CardContainer>
              ))}
            {cityDetails.place.length === 0 && (
              <Text variant="bodyMedium">Sem lugares relacionados!</Text>
            )}
          </Styles.SectionContainer>
        </View>
      )}
    </Styles.BodyContainer>
  );
};
