import { createDrawerNavigator } from "@react-navigation/drawer";
import { HistoryDetails } from "../screens/Home/Details";
import { HistoryList } from "../screens/Home/List";
import { HistoryCreate } from "../screens/Home/Create";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { TabsRouter } from "./Tab";
import { Button, Icon } from "react-native-paper";
import { useHistoryContext } from "../context/history/UseHistoryProvider";
import { api } from "../services/api";
import Toast from "react-native-toast-message";
import { useState } from "react";
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
