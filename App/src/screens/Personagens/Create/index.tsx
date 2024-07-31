import { View } from "react-native";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { z } from "zod";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, LoadingWrapper } from "../../../styles/GlobalStyles";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { ISelect } from "../../../utils/types";
import { api } from "../../../services/api";
import Toast from "react-native-toast-message";
import { characterScreenNavigationProp } from "../../../routes/character";

export const CreateCharacter = ({
  navigation,
}: characterScreenNavigationProp) => {
  const { historyId } = useHistoryContext();
  const [groupList, setGroupList] = useState<ISelect[]>([]);
  const [weaponList, setWeaponList] = useState<ISelect[]>([]);
  const [cityList, setCityList] = useState<ISelect[]>([]);
  const [placeList, setPlaceList] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState(true);

  const schema = z.object({
    name: z.string().min(1, "Campo obrigatório."),
    age: z.string().optional(),
    description: z.string().min(1, "Campo obrigatório."),
    personality: z.string().min(1, "Campo obrigatório."),
    weaponId: z.number().optional().nullable(),
    birthPlace: z.number().optional().nullable(),
    groupId: z.number().optional().nullable(),
    favoritePlaceId: z.number().optional().nullable(),
    historyId: z.number().nullable(),
  });

  type TFormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: "",
      name: "",
      birthPlace: null,
      description: "",
      favoritePlaceId: null,
      groupId: null,
      historyId,
      personality: "",
      weaponId: null,
    },
  });

  const reqGroup = async () => {
    await api
      .get(`group/select/${historyId}`)
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.message,
        });
      })
      .finally(() => setLoading(false));
  };

  const reqWeapon = async () => {
    await api
      .get(`weapon/select/${historyId}`)
      .then((res) => {
        setWeaponList(res.data);
        reqGroup();
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.message,
        });
      });
  };

  const reqCity = async () => {
    await api
      .get(`city/select/${historyId}`)
      .then((res) => {
        setCityList(res.data);
        reqWeapon();
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.message,
        });
      });
  };

  const reqPlace = async () => {
    await api
      .get(`place/select/${historyId}`)
      .then((res) => {
        setPlaceList(res.data);
        reqCity();
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.message,
        });
      });
  };

  const handleCreate = async (data: TFormData) => {
    await api
      .post("/character", {
        ...data,
        age: data.age ? Number(data.age) : null,
      })
      .then(() => {
        navigation.navigate("CharacterList");
        Toast.show({
          type: "success",
          text1: "Criado com sucesso",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Criado com sucesso",
        });
      });
  };

  useEffect(() => {
    reqPlace();
  }, []);

  return (
    <FormContainer>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator animating={true} color="purple" />
        </LoadingWrapper>
      )}
      {!loading && (
        <>
          <View>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextInput
                  label="Nome"
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.name}>
              {errors.name?.message}
            </HelperText>
          </View>
          <View>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Idade"
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.age}>
              {errors.age?.message}
            </HelperText>
          </View>
          <View>
            <Controller
              name="description"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextInput
                  label="Descrição"
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.description}>
              {errors.description?.message}
            </HelperText>
          </View>
          <View>
            <Controller
              name="personality"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextInput
                  label="Personalidade"
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.personality}>
              {errors.personality?.message}
            </HelperText>
          </View>
          <View>
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <RNPickerSelect
                  onValueChange={(value) => field.onChange(value)}
                  placeholder={{ label: "Grupo" }}
                  items={groupList.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              )}
            />
          </View>
          <View>
            <Controller
              name="weaponId"
              control={control}
              render={({ field }) => (
                <RNPickerSelect
                  onValueChange={(value) => field.onChange(value)}
                  placeholder={{ label: "Arma" }}
                  items={weaponList.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              )}
            />
          </View>
          <View>
            <Controller
              name="birthPlace"
              control={control}
              render={({ field }) => (
                <RNPickerSelect
                  onValueChange={(value) => field.onChange(value)}
                  placeholder={{ label: "Cidade de nascimento" }}
                  items={cityList.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              )}
            />
          </View>
          <View>
            <Controller
              name="favoritePlaceId"
              control={control}
              render={({ field }) => (
                <RNPickerSelect
                  onValueChange={(value) => field.onChange(value)}
                  placeholder={{ label: "Lugar Favorito" }}
                  items={placeList.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              )}
            />
          </View>
          <Button onPress={handleSubmit(handleCreate)}>Criar</Button>
        </>
      )}
    </FormContainer>
  );
};
