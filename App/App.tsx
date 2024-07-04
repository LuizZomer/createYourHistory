import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HistoryList } from "./src/screens/Home/List";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HistoryProvider } from "./src/context/history/HistoryProvider";
import { HistoryDetails } from "./src/screens/Home/Details";
import { CharacterList } from "./src/screens/Personagens/List";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Historias: undefined;
  Detalhes: undefined;
  Personagens: undefined;
};

export default function App() {
  return (
    <HistoryProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Historias">
            <Stack.Screen name="Historias" component={HistoryList} />
            <Stack.Screen name="Detalhes" component={HistoryDetails} />
            <Stack.Screen name="Personagens" component={CharacterList} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </HistoryProvider>
  );
}
