import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigators/RootNavigator";
import { useAtom } from "jotai";
import { listsAtom } from "../stores/lists";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ListRow from "../components/ListRow";
import { todosAtom } from "../stores/todos";

type Props = NativeStackScreenProps<RootParamList, "Lists">;
const ListsScreen = ({ navigation }: Props) => {
  const [lists] = useAtom(listsAtom);
  const [todos] = useAtom(todosAtom);

  const onNavigateToTodos = useCallback(
    (id?: string) => {
      navigation.navigate("Todos", {
        id,
      });
    },
    [navigation]
  );

  const openAddTodoListModal = useCallback(() => {
    navigation.push("AddList");
  }, [navigation]);

  return (
    <>
      <ScrollView
        style={{
          paddingVertical: 32,
        }}
      >
        <View style={{ marginBottom: 32 }}>
          <TouchableOpacity onPress={() => onNavigateToTodos()}>
            <ListRow title="All Todos" badge={todos.length.toLocaleString()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigateToTodos("completed")}>
            <ListRow
              title="Completed"
              badge={todos
                .filter((todo) => todo.isCompleted)
                .length.toLocaleString()}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              marginBottom: 8,
            }}
          >
            <Text style={{ flex: 1, fontSize: 16, textTransform: "uppercase" }}>
              Lists
            </Text>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={openAddTodoListModal}
            >
              <MaterialIcons name="add" size={24} />
            </TouchableOpacity>
          </View>
          {lists.map((list) => (
            <TouchableOpacity
              key={list.id}
              onPress={() => onNavigateToTodos(list.id)}
            >
              <ListRow
                title={list.title}
                badge={todos
                  .filter((todo) => todo.list === list.id)
                  .length.toLocaleString()}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ListsScreen;
