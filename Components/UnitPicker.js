import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-community/picker";

export default function UnitPicker({ unitsSystem, setUnitsSystem }) {
  return (
    <View style={style.unit}>
      <Picker
        mode="dropdown"
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        itemStyle={{ fontSize: 12 }}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker>
    </View>
  );
}

const style = StyleSheet.create({
  unit: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -30,
      },
      android: {
        top: 48,

        marginLeft: -16,
      },
    }),
    height: 50,
    width: 100,
    left: 20,
  },
});
