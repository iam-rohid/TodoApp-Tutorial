import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { createTodoFormTitle, Todo } from "../models/todo";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onAddTodo: (todo: Todo) => void;
};

const AddTodoBar = (props: Props) => {
  const { onAddTodo } = props;
  const [value, setValue] = useState("");

  const handleAddTodo = useCallback(() => {
    onAddTodo(createTodoFormTitle(value));
    setValue("");
  }, [value, onAddTodo]);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ padding: 16, backgroundColor: "#fff" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Add Todo"
          value={value}
          onChangeText={setValue}
          style={{
            flex: 1,
            height: 36,
            paddingHorizontal: 8,
            backgroundColor: "#f1f1f1",
            marginRight: 16,
            borderRadius: 8,
          }}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          style={{
            paddingHorizontal: 8,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTodoBar;
