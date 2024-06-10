import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Stat from "../../../components/Stat";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import MapPoints from "../../../components/MapPoints";
import SpeedGraph from "../../../components/SpeedGraph";

export default function Session() {
  const local = useLocalSearchParams();
  const navigation = useNavigation();
  const [session, setSession] = useState();
  console.log(local.session);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(`http://3.83.197.166:3000/${local.session}`);
      const data = await response.json();
      setSession(data);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session)
      navigation.setOptions({
        title: dayjs(session.start_time).format("ddd MMMM D, YYYY"),
      });
  }, [session]);

  const Row = ({ children }) => {
    return <View style={styles.row}>{children}</View>;
  };

  const averageSpeed = (velocities) => {
    const sum = velocities.reduce(
      (acc, curr) => acc + curr.velocity,
      0,
    );
    return sum / velocities.length;
  };

  return session ? (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <MapPoints points={session.location} />
      <View style={styles.container}>
        <Row>
          <Stat
            name="DISTANCE (KM)"
            icon={<FontAwesome6 name="map" />}
            value={session.distance}
          />
          <Stat
            name="AVG SPEED (KM/H)"
            icon={<Ionicons name="speedometer" />}
            value={averageSpeed(session.velocity).toFixed(2)}
          />
        </Row>
        <Row>
          <Stat
            name="ALTITUDE (M)"
            icon={<FontAwesome6 name="arrow-up" />}
            value={session?.altitude}
          />
          <Stat
            name="POSITIVE ALTITUDE"
            icon={<FontAwesome6 name="arrow-up" />}
            value={session?.p_altitude}
          />
        </Row>
        <Row>
          <Stat
            name="CALORIES (KCAL)"
            icon={<FontAwesome6 name="fire" />}
            value={session?.calories}
          />
          <Stat
            name="TIME (MIN)"
            icon={<FontAwesome6 name="map" />}
            value={dayjs(session.end_time).diff(
              dayjs(session.start_time),
              "minutes",
            )}
          />
        </Row>
      </View>
      <View>
        <SpeedGraph velocities={session.velocity} />
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator style={styles.loader} />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
