import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HistoryList } from "./src/screens/Home/List";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HistoryProvider } from "./src/context/history/HistoryProvider";
import { HistoryDetails } from "./src/screens/Home/Details";
import { CharacterList } from "./src/screens/Personagens/List";
import { HistoryCreate } from "./src/screens/Home/Create";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  historyList: undefined;
  historyDetails: undefined;
  historyCreate: undefined;
  Personagens: undefined;
};

export default function App() {
  return (
    <HistoryProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="historyList">
            <Stack.Screen
              name="historyList"
              component={HistoryList}
              options={{ title: "Histórias" }}
            />
            <Stack.Screen
              name="historyDetails"
              component={HistoryDetails}
              options={{ title: "Detalhes da história" }}
            />
            <Stack.Screen
              name="historyCreate"
              component={HistoryCreate}
              options={{ title: "Criar história" }}
            />
            <Stack.Screen name="Personagens" component={CharacterList} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </HistoryProvider>
  );
}
