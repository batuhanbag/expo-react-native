import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import WEATHER_API_KEY from "./API_KEY";
import WeatherInfo from "./Components/WeatherInfo";
import UnitPicker from "./Components/UnitPicker";
import { colors } from "./utils";
import IconReload from "./Components/IconReload";
import WeatherDetails from "./Components/WeatherDetails";

const BASE_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  // const [location, setLocation] = useState({});
  // const getCurrentWeather = () => {};

  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status != "granted") {
        setErrorMessage(" Access to location is needed to run the app ");
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherAPIurl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherAPIurl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }

      // setLocation({ latitude, longitude });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (currentWeather) {
    return (
      <View style={style.container}>
        <View style={style.main}>
          <UnitPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <IconReload load={load} />
          <WeatherInfo
            unitsSystem={unitsSystem}
            currentWeather={currentWeather}
          />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <IconReload load={load} />
        <Text>{errorMessage}</Text>
      </View>
    );
  } else {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
