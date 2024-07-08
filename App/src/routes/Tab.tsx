import { HistoryDetails } from "../screens/Home/Details";
import { HistoryCreate } from "../screens/Home/Create";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CharacterList } from "../screens/Personagens/List";
import { WeaponList } from "../screens/Weapon/List";
import { CityList } from "../screens/City/List";
import { Icon } from "react-native-paper";

export type CharacterTabParamList = {
  characterList: undefined;
  weaponList: undefined;
  cityList: undefined;
};

const Tab = createBottomTabNavigator<CharacterTabParamList>();

export const TabsRouter = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="characterList"
      component={CharacterList}
      options={{
        title: "Personagens",
        tabBarIcon: ({ color, size }) => (
          <Icon source="account" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="weaponList"
      component={WeaponList}
      options={{
        title: "Armas",
        tabBarIcon: ({ color, size }) => (
          <Icon source="sword" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="cityList"
      component={CityList}
      options={{
        title: "Cidades",
        tabBarIcon: ({ color, size }) => (
          <Icon source="city" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
