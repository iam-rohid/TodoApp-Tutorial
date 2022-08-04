import { getUid } from "../utils/getUid";

export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
  list?: string;
}

export const createTodoFormTitle = (title: string): Todo => {
  return {
    id: getUid(),
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
