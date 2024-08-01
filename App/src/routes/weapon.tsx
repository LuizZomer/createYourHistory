import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CreateCharacter } from "../screens/Personagens/Create";
import { WeaponList } from "../screens/Weapon/List";
import { WeaponCreate } from "../screens/Weapon/Create";
import { WeaponDetails } from "../screens/Weapon/Details";

export type weaponStackParamList = {
  WeaponList: undefined;
  WeaponDetails: {
    id: number;
  };
  WeaponCreate: undefined;
};

const Stack = createNativeStackNavigator<weaponStackParamList>();

export type WeaponDetailsProps = NativeStackScreenProps<
  weaponStackParamList,
  "WeaponDetails"
>;

export type weaponScreenNavigationProp =
  NativeStackScreenProps<weaponStackParamList>;

export const WeaponRouter = () => {
  return (
    <Stack.Navigator initialRouteName="WeaponList">
      <Stack.Screen
        name="WeaponList"
        component={WeaponList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WeaponDetails"
        component={WeaponDetails}
        options={{
          title: "Detalhes das armas",
        }}
      />
      <Stack.Screen
        name="WeaponCreate"
        component={WeaponCreate}
        options={{ title: "Crie sua arma" }}
      />
    </Stack.Navigator>
  );
};
