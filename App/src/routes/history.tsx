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

export type DetailsStackParamList = {
  historyList: undefined;
  historyDetails: undefined;
  historyCreate: undefined;
};

const Stack = createNativeStackNavigator<DetailsStackParamList>();

type DetailsScreenNavigationProp =
  NativeStackScreenProps<DetailsStackParamList>;

export const HistoryRouter = ({ navigation }: DetailsScreenNavigationProp) => {
  const { historyId } = useHistoryContext();
  const [visible, setVisible] = useState(false);

  const handleDelete = async () => {
    await api
      .delete(`/history/${historyId}`)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Historia apagada com sucesso",
        });
        navigation.navigate("historyList");
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Impossivel realizar a ação",
        });
      });
  };

  return (
    <Stack.Navigator initialRouteName="historyList">
      <Stack.Screen
        name="historyList"
        component={HistoryList}
        options={{ title: "Historias" }}
      />
      <Stack.Screen
        name="historyDetails"
        component={TabsRouter}
        options={{
          title: "Detalhes da historia",
          headerRight: () => (
            <>
              <Button onPress={handleDelete}>
                <Icon size={25} source="trash-can-outline" />
              </Button>
              <Button onPress={() => ""}>
                <Icon size={25} source="pencil" />
              </Button>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="historyCreate"
        component={HistoryCreate}
        options={{ title: "Crie sua historia" }}
      />
    </Stack.Navigator>
  );
};
