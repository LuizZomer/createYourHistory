import { FlatList, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import { CardContainer } from "../../../styles/GlobalStyles";
import * as Styles from "./styles";
import { RootStackParamList } from "../../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type DetalhesScreenNavigationProp = NativeStackScreenProps<RootStackParamList>;

const actionList = [
  { label: "Personagens" },
  //   { label: "Cidades" },
  //   { label: "Lugares" },
  //   { label: "Armas" },
];

export const HistoryDetails = ({
  navigation,
}: DetalhesScreenNavigationProp) => {
  return (
    <Styles.Container>
      <Text variant="headlineMedium">Itens da história</Text>
      <FlatList
        data={actionList}
        renderItem={({ item, index }) => (
          <CardContainer key={index}>
            <Card
              onPress={() => {
                navigation.navigate("Personagens");
              }}
            >
              <Card.Title title={item.label} />
            </Card>
          </CardContainer>
        )}
      />
    </Styles.Container>
  );
};
