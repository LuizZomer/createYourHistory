import { View } from "react-native";
import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { useFetch } from "../../../Hooks/useFetch";
import { IWeapon } from "../../../utils/types";
import { LoadingWrapper } from "../../../styles/GlobalStyles";
import * as Styles from "./styles";
import { api } from "../../../services/api";
import Toast from "react-native-toast-message";
import { WeaponDetailsProps } from "../../../routes/weapon";

export const WeaponDetails = ({ navigation, route }: WeaponDetailsProps) => {
  const { historyId } = useHistoryContext();
  const { id } = route.params;
  const { data: weaponDetails, loading } = useFetch<IWeapon>({
    route: `/weapon/${historyId}/${id}`,
  });

  const handleDelete = async () => {
    await api
      .delete(`/weapon/${historyId}/${id}`)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Arma apagada com sucesso",
        });
        navigation.navigate("WeaponList");
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
      {!loading && weaponDetails && (
        <View>
          <Styles.Header>
            <Text variant="headlineMedium">{weaponDetails.name}</Text>
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
            <Text variant="bodyMedium">{weaponDetails.description}</Text>
            <Text variant="bodyMedium">{weaponDetails.power}</Text>
          </Styles.InfoContainer>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Personagem</Text>
            {weaponDetails.character && (
              <Styles.InfoContainer>
                <Text variant="bodyMedium">{weaponDetails.character.name}</Text>
                <Text variant="bodyMedium">
                  {weaponDetails.character.description}
                </Text>
              </Styles.InfoContainer>
            )}
            {!weaponDetails.character && (
              <Text variant="bodyMedium">Sem personagem relacionada!</Text>
            )}
          </Styles.SectionContainer>
        </View>
      )}
    </Styles.BodyContainer>
  );
};
