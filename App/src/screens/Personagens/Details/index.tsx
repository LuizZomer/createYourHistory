import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { CharacterDetailsProps } from "../../../routes/character";
import { useState } from "react";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { useFetch } from "../../../Hooks/useFetch";
import { ICharacter } from "../../../utils/types";
import { LoadingWrapper } from "../../../styles/GlobalStyles";

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

  return (
    <View>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      {!loading && characterDetails && (
        <View>
          <Text>{characterDetails.name}</Text>
          <Text>{characterDetails.weapon.name}</Text>
        </View>
      )}
    </View>
  );
};
