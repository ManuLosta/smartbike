import { View, StyleSheet } from "react-native";
import StartButton from "../../components/StartButton";
import SessionStats from "../../components/SessionStats";
import Constants from "expo-constants/src/Constants";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useMqtt } from "../../context/MqttContext";
import { useEffect, useState } from "react";

export default function Tab() {
  const { mqttClient, subscribeToTopic, mqttData } = useMqtt();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.002,
  });

  useEffect(() => {
    subscribeToTopic(["smartbike/inel00/01/data/live"], { qos: 1 });
  }, [mqttClient]);

  useEffect(() => {
    setRegion({
      latitude: Number(mqttData?.message?.loc.lat) || 0,
      longitude: Number(mqttData?.message?.loc.lng) || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.002,
    });
    console.log(region);
  }, [mqttData]);

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
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
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "40%",
  },
});
