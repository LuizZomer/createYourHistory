import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { PlaceList } from "../screens/Place/List";
import { PlaceCreate } from "../screens/Place/Create";
import { PlaceDetails } from "../screens/Place/Details";

export type placeStackParamList = {
  PlaceList: undefined;
  PlaceDetails: {
    id: number;
  };
  PlaceCreate: undefined;
};

const Stack = createNativeStackNavigator<placeStackParamList>();

export type PlaceDetailsProps = NativeStackScreenProps<
  placeStackParamList,
  "PlaceDetails"
>;

export type placeScreenNavigationProp =
  NativeStackScreenProps<placeStackParamList>;

export const PlaceRouter = () => {
  return (
    <Stack.Navigator initialRouteName="PlaceList">
      <Stack.Screen
        name="PlaceList"
        component={PlaceList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={{
          title: "Detalhes do lugar",
        }}
      />
      <Stack.Screen
        name="PlaceCreate"
        component={PlaceCreate}
        options={{ title: "Crie seu lugar" }}
      />
    </Stack.Navigator>
  );
};
