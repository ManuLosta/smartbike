import { View, StyleSheet } from "react-native";
import StartButton from "../../components/StartButton";
import SessionStats from "../../components/SessionStats";
import Constants from "expo-constants/src/Constants";
import MapView, { Marker } from "react-native-maps";
import { useMqtt } from "../../context/MqttContext";
import { useEffect, useState } from "react";

export default function Tab() {
  const { mqttClient, subscribeToTopic, mqttData } = useMqtt();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    subscribeToTopic(["smartbike/inel00/01/data/live"], { qos: 1 });
  }, [mqttClient]);

  useEffect(() => {
    setRegion({
      latitude: Number(mqttData?.message?.loc.lat) || 0,
      longitude: Number(mqttData?.message?.loc.lng) || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(region);
  }, [mqttData]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <SessionStats stats={mqttData?.message} />
      <StartButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "40%",
  },
});
