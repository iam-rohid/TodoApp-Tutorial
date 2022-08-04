import uuid from "react-native-uuid";
export const getUid = (): string => {
  return uuid.v4() as string;
};
