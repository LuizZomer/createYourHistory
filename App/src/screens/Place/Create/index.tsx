import { View } from "react-native";
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
} from "react-native-paper";
import { z } from "zod";
import { useHistoryContext } from "../../../context/history/UseHistoryProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, LoadingWrapper } from "../../../styles/GlobalStyles";
import { api } from "../../../services/api";
import Toast from "react-native-toast-message";
import { placeScreenNavigationProp } from "../../../routes/place";
import { useEffect, useState } from "react";
import { ICity } from "../../../utils/types";
import RNPickerSelect from "react-native-picker-select";

export const PlaceCreate = ({ navigation }: placeScreenNavigationProp) => {
  const { historyId } = useHistoryContext();
  const [cityList, setCityList] = useState<ICity[]>([]);

  const schema = z.object({
    name: z.string().min(1, "Campo obrigatório."),
    description: z.string().min(1, "Campo obrigatório."),
    cityId: z.number().min(1, "Campo obrigatório."),
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
      name: "",
      description: "",
      historyId,
    },
  });

  const handleCreate = async (data: TFormData) => {
    await api
      .post("/place", {
        ...data,
      })
      .then(() => {
        navigation.navigate("PlaceList");
        Toast.show({
          type: "success",
          text1: "Criado com sucesso",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro ao criar!",
        });
      });
  };

  const reqCityList = async () => {
    await api
      .get(`city/select/${historyId}`)
      .then((res) => {
        setCityList(res.data);
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.message,
        });
      });
  };

  useEffect(() => {
    reqCityList();
  }, []);

  return (
    <FormContainer>
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
          name="cityId"
          control={control}
          render={({ field }) => (
            <RNPickerSelect
              onValueChange={(value) => field.onChange(value)}
              placeholder={{ label: "Cidades" }}
              items={cityList.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
            />
          )}
        />
      </View>

      <Button onPress={handleSubmit(handleCreate)}>Criar</Button>
    </FormContainer>
  );
};
