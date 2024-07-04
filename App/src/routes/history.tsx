import { createDrawerNavigator } from "@react-navigation/drawer";
import { HistoryDetails } from "../screens/Home/Details";
import { HistoryList } from "../screens/Home/List";
import { HistoryCreate } from "../screens/Home/Create";

const Drawer = createDrawerNavigator();

export const HistoryRouter = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Histórias" component={HistoryList} />
    <Drawer.Screen name="Detalhes" component={HistoryDetails} />
    <Drawer.Screen name="Criar Historia" component={HistoryCreate} />
  </Drawer.Navigator>
);
