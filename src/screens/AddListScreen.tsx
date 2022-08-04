import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigators/RootNavigator";
import { useAtom } from "jotai";
import { listsAtom } from "../stores/lists";
import { createListFromTitle } from "../models/list";

type Props = NativeStackScreenProps<RootParamList, "AddList">;

const AddListScreen = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [lists, setLists] = useAtom(listsAtom);

  const handleAddList = useCallback(() => {
    const list = createListFromTitle(name);
    setLists([...lists, list]);
    navigation.goBack();
  }, [navigation, name, setLists, lists]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add List",
      headerRight: ({ tintColor }) => (
        <TouchableOpacity onPress={handleAddList}>
          <Text style={{ fontWeight: "600", fontSize: 16, color: tintColor }}>
            Add
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "red" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleAddList]);
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="List Name"
        onSubmitEditing={handleAddList}
      />
    </View>
  );
};

export default AddListScreen;
