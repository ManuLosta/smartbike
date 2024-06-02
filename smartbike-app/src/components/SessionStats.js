import { View, Text, StyleSheet } from "react-native";
import { useMqtt } from "../context/MqttContext";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import { AntDesign } from "@expo/vector-icons";
import Stat from "./Stat";

export default function SessionStats({ stats }) {
  const { mqttClient, subscribeToTopic, mqttData } = useMqtt();

  useEffect(() => {
    subscribeToTopic(["smartbike/inel00/01/data/live"], { qos: 1 });
  }, [mqttClient]);

  const Row = ({ children }) => {
    return (
      <View style={styles.row}>
        {children}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Row>
        <Stat name="SPEED (KM/H)" icon="map" value={stats?.speed || "--"} />
        <Stat name="DISTANCE (M)" icon="map" value={stats?.distance || "--"} />
      </Row>
      <Row>
        <Stat name="ALTITUDE (M)" icon="arrow-up" value={stats?.altitude || "--"} />
        <Stat name="POSITIVE ALTITUDE" icon="arrow-up" value={stats?.p_altitude || "--"} />
      </Row>
      <Row>
        <Stat name="CALORIES (KCAL)" icon="fire" value={stats?.calories || "--"} />
        <Stat name="TIME" icon="map" value={"--"} />
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
  },
  row: {
    flexDirection: "row",
  }
});
