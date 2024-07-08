import { Image } from "react-native";

interface IICon {
  icon: string;
}

export const IconComponent = ({ icon }: IICon) => {
  return <Image source={{ uri: icon }} />;
};
