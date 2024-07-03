import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HistoryList } from "./src/screens/Home/List";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HistoryProvider } from "./src/context/history/HistoryProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Historias">
            <Stack.Screen name="Historias" component={HistoryList} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </HistoryProvider>
  );
}
