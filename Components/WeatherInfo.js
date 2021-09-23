import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherInfo({ currentWeather, unitsSystem }) {
  const {
    main: { temp, temp_min, temp_max },
    weather: [details],
    name,
    timezone,
  } = currentWeather;

  const ceilTemp = Math.ceil(temp);

  const { icon, main, description } = details;

  const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={style.weatherInfo}>
      <View style={style.cityBox}>
        <Text style={style.secondaryText}>{name}</Text>
      </View>

      <Image style={style.weatherIcon} source={{ uri: iconURL }} />
      {unitsSystem === "metric" ? (
        <Text style={style.primaryText}>
          {ceilTemp} <Text>C°</Text>
        </Text>
      ) : (
        <Text style={style.primaryText}>
          {ceilTemp} <Text>F°</Text>
        </Text>
      )}

      <Text style={style.weatherDescription}>{description}</Text>
      <Text style={style.secondaryText}>{main}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },

  primaryText: {
    fontSize: 40,
    color: PRIMARY_COLOR,
  },

  secondaryText: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: "500",
    marginTop: 10,
  },
  cityBox: {
    borderWidth: 2,
    borderColor: BORDER_COLOR,
    padding: 10,
  },
});
