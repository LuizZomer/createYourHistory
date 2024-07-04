import { useEffect, useState } from "react";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { api } from "../../../services/api";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import {
  CardContainer,
  CardContentContainer,
} from "../../../styles/GlobalStyles";

export const CharacterList = () => {
  const { historyId } = useHistoryContext();
  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  const reqCharacter = async () => {
    await api.get(`character/${historyId}`).then((res) => {
      setCharacterList(res.data);
    });
  };

  useEffect(() => {
    reqCharacter();
  }, []);

  return (
    <View>
      <FlatList
        data={characterList}
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
