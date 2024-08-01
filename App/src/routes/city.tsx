import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { WeaponList } from "../screens/Weapon/List";
import { CityList } from "../screens/City/List";
import { CityCreate } from "../screens/City/Create";
import { CityDetails } from "../screens/City/Details";

export type cityStackParamList = {
  CityList: undefined;
  CityDetails: {
    id: number;
  };
  CityCreate: undefined;
};

const Stack = createNativeStackNavigator<cityStackParamList>();

export type CityDetailsProps = NativeStackScreenProps<
  cityStackParamList,
  "CityDetails"
>;

export type cityScreenNavigationProp =
  NativeStackScreenProps<cityStackParamList>;

export const CityRouter = () => {
  return (
    <Stack.Navigator initialRouteName="CityList">
      <Stack.Screen
        name="CityList"
        component={CityList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CityDetails"
        component={CityDetails}
        options={{
          title: "Detalhes das armas",
        }}
      />
      <Stack.Screen
        name="CityCreate"
        component={CityCreate}
        options={{ title: "Crie sua cidade" }}
      />
    </Stack.Navigator>
  );
};
