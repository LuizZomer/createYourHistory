import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CharacterList } from "../screens/Personagens/List";
import { CreateCharacter } from "../screens/Personagens/Create";
import { CharacterDetails } from "../screens/Personagens/Details";

export type characterStackParamList = {
  CharacterList: undefined;
  CharacterDetails: {
    id: number;
  };
  CharacterCreate: undefined;
};

const Stack = createNativeStackNavigator<characterStackParamList>();

export type CharacterDetailsProps = NativeStackScreenProps<
  characterStackParamList,
  "CharacterDetails"
>;

export type characterScreenNavigationProp =
  NativeStackScreenProps<characterStackParamList>;

export const CharacterRouter = () => {
  return (
    <Stack.Navigator initialRouteName="CharacterList">
      <Stack.Screen
        name="CharacterList"
        component={CharacterList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CharacterDetails"
        component={CharacterDetails}
        options={{
          title: "Detalhes da personagem",
        }}
      />
      <Stack.Screen
        name="CharacterCreate"
        component={CreateCharacter}
        options={{ title: "Crie sua personagem" }}
      />
    </Stack.Navigator>
  );
};
