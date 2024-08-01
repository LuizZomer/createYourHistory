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
import { characterScreenNavigationProp } from "../../../routes/character";
import { weaponScreenNavigationProp } from "../../../routes/weapon";

export const WeaponCreate = ({ navigation }: weaponScreenNavigationProp) => {
  const { historyId } = useHistoryContext();

  const schema = z.object({
    name: z.string().min(1, "Campo obrigatório."),
    power: z.string().min(1, "Campo obrigatório."),
    description: z.string().min(1, "Campo obrigatório."),
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
      power: "",
      historyId,
    },
  });

  const handleCreate = async (data: TFormData) => {
    await api
      .post("/weapon", {
        ...data,
      })
      .then(() => {
        navigation.navigate("WeaponList");
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
          name="power"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Poder"
              onChangeText={field.onChange}
              value={field.value}
              onBlur={field.onBlur}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.power}>
          {errors.power?.message}
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
      <Button onPress={handleSubmit(handleCreate)}>Criar</Button>
    </FormContainer>
  );
};
