import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../services/api";

export const HistoryCreate = () => {
  const schema = z.object({
    name: z.string().min(1, "Campo obrigatório"),
    description: z.string().min(1, "Campo obrigatório"),
  });

  type TFormData = z.infer<typeof schema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const handleCreate = (data: TFormData) => {
    // api.post('history',{
    //   ...data
    // }).then((res) => {
    // })
  };

  return (
    <View>
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
      <Button onPress={handleSubmit(handleCreate)}>Criar</Button>
    </View>
  );
};
