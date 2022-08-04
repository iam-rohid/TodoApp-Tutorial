import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListsScreen from "../screens/ListsScreen";
import TodosScreen from "../screens/TodosScreen";
import AddListScreen from "../screens/AddListScreen";

export type RootParamList = {
  Lists: undefined;
  Todos: {
    id?: string;
  };
  AddList: undefined;
};

const RootStack = createNativeStackNavigator<RootParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Lists" component={ListsScreen} />
      <RootStack.Screen name="Todos" component={TodosScreen} />
      <RootStack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <RootStack.Screen name="AddList" component={AddListScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
