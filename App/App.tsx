import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HistoryProvider } from "./src/context/history/HistoryProvider";
import Toast from "react-native-toast-message";
import { HistoryRouter, DetailsStackParamList } from "./src/routes/history";
import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "./src/firebase/init";
import Login from "./src/firebase/lgn";

export type RootStackParamList = {
  lgn:undefined,
  history: undefined;
  character: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const app = initializeApp(FirebaseConfig);

export default function App() {
  return (
    <HistoryProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="lgn">
            <Stack.Screen
              name="lgn"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="history"
              component={HistoryRouter}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </HistoryProvider>
  );
}
