import { FAB } from "react-native-paper";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 5px;
  gap: 5px;
`;

export const FabStyled = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
`;
