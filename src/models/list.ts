import { getUid } from "../utils/getUid";

export interface List {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export const createListFromTitle = (title: string): List => {
  return {
    id: getUid(),
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
