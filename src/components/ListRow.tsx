import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  title: string;
  badge?: string;
};
const ListRow = (props: Props) => {
  const { title, badge } = props;
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
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
      </View>
      {!!badge && (
        <Text style={{ fontSize: 12, fontWeight: "600", marginRight: 4 }}>
          {badge}
        </Text>
      )}
      <TouchableOpacity
        style={{
          padding: 4,
        }}
      >
        <MaterialIcons name={"more-horiz"} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ListRow;
