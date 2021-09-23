import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { colors } from "../utils";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails({ currentWeather, unitsSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
    s,
  } = currentWeather;

  const windSpeed =
    unitsSystem == "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;

  return (
    <View style={style.weatherDetails}>
      <View style={style.detailsRow}>
        <View
          style={{
            ...style.detailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={style.detailsRow}>
            <FontAwesome5
              name="temperature-low"
              size={25}
              color={PRIMARY_COLOR}
            />
            <View style={style.weatherDetailsItems}>
              <Text>Feels Like </Text>
              <Text style={style.secondaryText}>{Math.ceil(feels_like)} °</Text>
            </View>
          </View>
        </View>
        <View style={style.detailsBox}>
          <View style={style.detailsRow}>
            <MaterialCommunityIcons
              name="water"
              size={35}
              color={PRIMARY_COLOR}
            />
            <View style={style.weatherDetailsItems}>
              <Text>Humidity </Text>
              <Text style={style.secondaryText}>{Math.ceil(humidity)} %</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...style.detailsRow,
          borderTopWidth: 1,
          borderTopColor: PRIMARY_COLOR,
        }}
      >
        <View
          style={{
            ...style.detailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={style.detailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={30}
              color={PRIMARY_COLOR}
            />
            <View style={style.weatherDetailsItems}>
              <Text> Wind Speed </Text>
              <Text
                style={{
                  ...style.secondaryText,
                  ...Platform.select({
                    ios: { fontSize: 15 },
                    android: { fontSize: 17 },
                  }),
                }}
              >
                {windSpeed}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.detailsBox}>
          <View style={style.detailsRow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={35}
              color={PRIMARY_COLOR}
            />
            <View style={style.weatherDetailsItems}>
              <Text>Pressure </Text>
              <Text style={style.secondaryText}>{pressure}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  weatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  secondaryText: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: "700",
  },
});
