import { View, Text, StyleSheet } from "react-native";
import { useMqtt } from "../context/MqttContext";
import { useEffect } from "react";
import Stat from "./Stat";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function SessionStats({ stats }) {
  const { mqttClient, subscribeToTopic, mqttData } = useMqtt();

  useEffect(() => {
    subscribeToTopic(["smartbike/inel00/01/data/live"], { qos: 1 });
  }, [mqttClient]);

  const Row = ({ children }) => {
    return <View style={styles.row}>{children}</View>;
  };

  return (
    <View style={styles.container}>
      <Row>
        <Stat
          name="SPEED (KM/H)"
          icon={<Ionicons name="speedometer" />}
          value={stats?.speed || "--"}
        />
        <Stat
          name="DISTANCE (M)"
          icon={<FontAwesome6 name="map" />}
          value={stats?.distance || "--"}
        />
      </Row>
      <Row>
        <Stat
          name="ALTITUDE (M)"
          icon={<FontAwesome6 name="arrow-up" />}
          value={stats?.altitude || "--"}
        />
        <Stat
          name="POSITIVE ALTITUDE"
          icon={<FontAwesome6 name="arrow-up" />}
          value={stats?.p_altitude || "--"}
        />
      </Row>
      <Row>
        <Stat
          name="CALORIES (KCAL)"
          icon={<FontAwesome6 name="fire" />}
          value={stats?.calories || "--"}
        />
        <Stat name="TIME" icon={<FontAwesome6 name="map" />} value={"--"} />
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
  },
});
