import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils";

export default function IconReload({ load }) {
  const reloadIconName = Platform.OS == "ios" ? "ios-refresh" : "md-refresh";
  return (
    <View style={style.iconReload}>
      <Ionicons
        onPress={load}
        name={reloadIconName}
        size={24}
        color={colors.PRIMARY_COLOR}
      />
    </View>
  );
}

const style = StyleSheet.create({
  iconReload: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: 30,
        right: 20,
      },
      android: {
        top: 54,
        right: 20,
      },
    }),
  },
});
