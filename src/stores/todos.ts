import { atom } from "jotai";
import { Todo } from "../models/todo";

export const todosAtom = atom<Todo[]>([]);
