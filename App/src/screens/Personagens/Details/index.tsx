import { View } from "react-native";
import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";
import { CharacterDetailsProps } from "../../../routes/character";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { useFetch } from "../../../Hooks/useFetch";
import { ICharacter } from "../../../utils/types";
import { LoadingWrapper } from "../../../styles/GlobalStyles";
import * as Styles from "./styles";
import { api } from "../../../services/api";
import Toast from "react-native-toast-message";

export const CharacterDetails = ({
  navigation,
  route,
}: CharacterDetailsProps) => {
  const { historyId } = useHistoryContext();
  const { id } = route.params;
  const { data: characterDetails, loading } = useFetch<ICharacter>({
    route: `/character/${historyId}/${id}`,
    extension: "correctCharacter",
  });

  const handleDelete = async () => {
    await api
      .delete(`/character/${historyId}/${id}`)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "personagem apagado com sucesso",
        });
        navigation.navigate("CharacterList");
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
      {!loading && characterDetails && (
        <View>
          <Styles.Header>
            <Text variant="headlineMedium">{characterDetails.name}</Text>
            <Styles.ActionButton>
              <Button onPress={handleDelete}>
                <Icon size={25} source="trash-can-outline" />
              </Button>
              <Button onPress={() => ""}>
                <Icon size={25} source="pencil" />
              </Button>
            </Styles.ActionButton>
          </Styles.Header>
          <Text variant="bodyMedium">{characterDetails.description}</Text>
          <Text variant="bodyMedium">{characterDetails.age}</Text>
          <Text variant="bodyMedium">
            Personalidade: {characterDetails.personality}
          </Text>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Arma</Text>
            {characterDetails.weapon && (
              <Styles.InfoContainer>
                <Text variant="bodyMedium">{characterDetails.weapon.name}</Text>
                <Text variant="bodyMedium">
                  {characterDetails.weapon.description}
                </Text>
                <Text variant="bodyMedium">
                  {characterDetails.weapon.power}
                </Text>
              </Styles.InfoContainer>
            )}
            {!characterDetails.weapon && (
              <Text variant="bodyMedium">Sem armas relacionada!</Text>
            )}
          </Styles.SectionContainer>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Grupo</Text>
            {characterDetails.group && (
              <Styles.InfoContainer>
                <Text variant="bodyMedium">{characterDetails.group.name}</Text>
                <Text variant="bodyMedium">
                  {characterDetails.group.description}
                </Text>
                <Text variant="bodyMedium">
                  {characterDetails.group.behalf}
                </Text>
              </Styles.InfoContainer>
            )}

            {!characterDetails.group && (
              <Text variant="bodyMedium">Sem grupo relacionada!</Text>
            )}
          </Styles.SectionContainer>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Lugar favorito</Text>
            {characterDetails.favoritePlace && (
              <Styles.InfoContainer>
                <Text variant="bodyMedium">
                  {characterDetails.favoritePlace.name}
                </Text>
                <Text variant="bodyMedium">
                  {characterDetails.favoritePlace.description}
                </Text>
              </Styles.InfoContainer>
            )}

            {!characterDetails.favoritePlace && (
              <Text variant="bodyMedium">Sem Lugar favorito relacionada!</Text>
            )}
          </Styles.SectionContainer>
          <Styles.SectionContainer>
            <Text variant="headlineSmall">Cidade de nascimento</Text>
            {characterDetails.birthPlace && (
              <Styles.InfoContainer>
                <Text variant="bodyMedium">
                  {characterDetails.birthPlace.name}
                </Text>
                <Text variant="bodyMedium">
                  {characterDetails.birthPlace.description}
                </Text>
              </Styles.InfoContainer>
            )}

            {!characterDetails.birthPlace && (
              <Text variant="bodyMedium">
                Sem cidade de nascimento relacionada!
              </Text>
            )}
          </Styles.SectionContainer>
        </View>
      )}
    </Styles.BodyContainer>
  );
};
