import { useEffect, useState } from "react";
import { api } from "../services/api";
import Toast from "react-native-toast-message";

interface IUseFetchProps {
    route: string;
    detail?: string;
    extension?: string
}

interface IUseFetchReturn<T> {
    data: T;
    loading: boolean;
    refetch: () => void;
}

export const useFetch = <T>({route,detail, extension}:IUseFetchProps): IUseFetchReturn<T> => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        await api
            .get(detail ? `${route}/${detail}` : route)
            .then((res) => {
                const result = extension ? res.data[extension] : res.data
                setData(result);
            })
            .catch(() => {
                Toast.show({
                  type: "error",
                  text1: "Falha ao criar",
                });
              })
                    .finally(() => {
                setLoading(false);
            });
    };

    const refetch = async () => {
        await fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data: data!, loading, refetch };
};
