import { View, ScrollView, Text } from "react-native";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigators/RootNavigator";
import AddTodoBar from "../components/AddTodoBar";
import { useAtom } from "jotai";
import { todosAtom } from "../stores/todos";
import TodoRow from "../components/TodoRow";
import { Todo } from "../models/todo";
import moment from "moment";
import { listsAtom } from "../stores/lists";

type Props = NativeStackScreenProps<RootParamList, "Todos">;
const TodosScreen = (props: Props) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [lists] = useAtom(listsAtom);
  const {
    route: {
      params: { id },
    },
    navigation,
  } = props;

  const list = useMemo(() => lists.find((l) => l.id === id), [id, lists]);

  const { uncompletedTodos, completedTodos } = useMemo(() => {
    let _todos: Todo[] = [];
    if (id && id === "completed") {
      _todos = todos.filter((todo) => todo.isCompleted);
    } else if (id) {
      _todos = todos.filter((todo) => todo.list === id);
    } else {
      _todos = todos;
    }
    _todos = _todos.sort((a, b) => {
      if (moment(a.createdAt).isBefore(moment(b.createdAt))) return 1;
      else if (moment(b.createdAt).isBefore(moment(a.createdAt))) return -1;
      else return 0;
    });

    return {
      uncompletedTodos: _todos.filter((todo) => !todo.isCompleted),
      completedTodos: _todos.filter((todo) => todo.isCompleted),
    };
  }, [todos, id]);

  const onAddTodo = useCallback(
    (todo) => {
      setTodos([...todos, { ...todo, list: list?.id }]);
    },
    [todos, setTodos, list]
  );

  const screenTitle = useMemo(() => {
    if (list) {
      return list.title;
    } else if (id && id === "completed") {
      return "Completed";
    } else {
      return "All Todos";
    }
  }, [id, list]);

  const canAddTodo = useMemo(() => !["completed"].includes(id || ""), [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
    });
  }, [screenTitle, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingVertical: 32 }}>
        {uncompletedTodos.length > 0 && (
          <View style={{ marginBottom: 32 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 8,
              }}
            >
              <Text
                style={{ flex: 1, fontSize: 16, textTransform: "uppercase" }}
              >
                Todos
              </Text>
            </View>
            {uncompletedTodos.map((todo) => (
              <TodoRow key={todo.id} todo={todo} />
            ))}
          </View>
        )}
        {completedTodos.length > 0 && (
          <View style={{ marginBottom: 32 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 8,
              }}
            >
              <Text
                style={{ flex: 1, fontSize: 16, textTransform: "uppercase" }}
              >
                Completed
              </Text>
            </View>
            {completedTodos.map((todo) => (
              <TodoRow key={todo.id} todo={todo} />
            ))}
          </View>
        )}
      </ScrollView>
      {canAddTodo && <AddTodoBar onAddTodo={onAddTodo} />}
    </View>
  );
};

export default TodosScreen;
