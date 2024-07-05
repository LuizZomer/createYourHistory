import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HistoryList } from "./src/screens/Home/List";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HistoryProvider } from "./src/context/history/HistoryProvider";
import { HistoryDetails } from "./src/screens/Home/Details";
import { CharacterList } from "./src/screens/Personagens/List";
import { HistoryCreate } from "./src/screens/Home/Create";
import Toast from "react-native-toast-message";
import { HistoryRouter, HistoryStackParamList } from "./src/routes/history";

export type RootStackParamList = {
  history: undefined;
  character: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <HistoryProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="history">
            <Stack.Screen
              name="history"
              component={HistoryRouter}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="character" component={CharacterList} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </HistoryProvider>
  );
}
