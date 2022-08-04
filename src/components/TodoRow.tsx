import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Todo } from "../models/todo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAtom } from "jotai";
import { todosAtom } from "../stores/todos";
type Props = {
  todo: Todo;
};

const TodoRow = (props: Props) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const { todo } = props;
  const toggleTodoCompleted = useCallback(() => {
    setTodos(
      todos.map<Todo>((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          };
        }
        return t;
      })
    );
  }, [todos, setTodos, todo]);

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#fff",
        marginBottom: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{todo.title}</Text>
        {!!todo.description && <Text>{todo.description}</Text>}
      </View>
      <TouchableOpacity
        onPress={toggleTodoCompleted}
        style={{
          padding: 4,
        }}
      >
        <MaterialIcons
          name={todo.isCompleted ? "check-circle" : "check-circle-outline"}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TodoRow;
