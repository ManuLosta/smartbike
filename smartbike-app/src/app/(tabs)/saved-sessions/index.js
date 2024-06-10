import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Link } from "expo-router";
import dayjs from "dayjs";
import Constants from "expo-constants/src/Constants";

export default function SavedSessions() {
  const [sessions, setSessions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSessions = useCallback(async () => {
    setRefreshing(true);
    const response = await fetch("http://3.83.197.166:3000");
    const data = await response.json();
    setSessions(data);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#fff" }}
        refreshControl={
          <RefreshControl onRefresh={fetchSessions} refreshing={refreshing} />
        }
      >
        <View style={styles.container}>
          {sessions.map((session) => (
            <Link
              href={{
                pathname: "saved-sessions/[session]",
                params: { session: session._id },
              }}
              style={styles.dateContainer}
              key={session._id}
            >
              <View>
                <Text style={styles.sessionText}>
                  {dayjs(session.start_time).format("ddd MMMM D, YYYY")} cycling
                  session
                </Text>
              </View>
              <View>
                <Text>DISTANCE: {session.distance} km</Text>
                <Text>
                  DURATION:{" "}
                  {dayjs(session.end_time).diff(
                    dayjs(session.start_time),
                    "minutes"
                  )}{" "}
                  min
                </Text>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  sessionsContainer: {
    width: "100%",
  },
  dateContainer: {
    flex: 2,
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  sessionText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
