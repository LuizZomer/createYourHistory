import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CityList } from "../screens/City/List";
import { Icon } from "react-native-paper";
import { CharacterRouter } from "./character";
import { WeaponRouter } from "./weapon";
import { CityRouter } from "./city";
import { PlaceRouter } from "./place";

export type CharacterTabParamList = {
  characterList: undefined;
  weaponList: undefined;
  cityList: undefined;
  placeList: undefined;
};

const Tab = createBottomTabNavigator<CharacterTabParamList>();

export const TabsRouter = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="characterList"
      component={CharacterRouter}
      options={{
        headerShown: false,
        title: "Personagem",
        tabBarIcon: ({ color, size }) => (
          <Icon source="account" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="weaponList"
      component={WeaponRouter}
      options={{
        headerShown: false,
        title: "Armas",
        tabBarIcon: ({ color, size }) => (
          <Icon source="sword" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="cityList"
      component={CityRouter}
      options={{
        title: "Cidades",
        tabBarIcon: ({ color, size }) => (
          <Icon source="city" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="placeList"
      component={PlaceRouter}
      options={{
        title: "Lugares",
        tabBarIcon: ({ color, size }) => (
          <Icon source="map-marker" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
