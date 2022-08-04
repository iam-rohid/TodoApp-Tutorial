import { atom } from "jotai";
import { List } from "../models/list";

export const listsAtom = atom<List[]>([]);
