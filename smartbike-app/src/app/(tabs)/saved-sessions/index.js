import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import dayjs from "dayjs";
import { Link } from "expo-router";
import Constants from "expo-constants/src/Constants";

export default function Tab() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const response = await fetch("http://3.83.197.166:3000");
      const sessions = await response.json();
      console.log(sessions);
      setSessions(sessions);
    }

    fetchSessions();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {sessions.map((session) => (
          <Link
            key={session._id}
            href={{
              pathname: "saved-sessions/[session]",
              params: { session: session._id },
            }}
            style={styles.dateContainer}
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
                  "minutes",
                )}{" "}
                min
              </Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
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
