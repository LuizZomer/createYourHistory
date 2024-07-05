import { createDrawerNavigator } from "@react-navigation/drawer";
import { HistoryDetails } from "../screens/Home/Details";
import { HistoryList } from "../screens/Home/List";
import { HistoryCreate } from "../screens/Home/Create";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type HistoryStackParamList = {
  historyList: undefined;
  historyDetails: undefined;
  historyCreate: undefined;
};

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export const HistoryRouter = () => (
  <Stack.Navigator initialRouteName="historyList">
    <Stack.Screen name="historyList" component={HistoryList} />
    <Stack.Screen name="historyDetails" component={HistoryDetails} />
    <Stack.Screen name="historyCreate" component={HistoryCreate} />
  </Stack.Navigator>
);
