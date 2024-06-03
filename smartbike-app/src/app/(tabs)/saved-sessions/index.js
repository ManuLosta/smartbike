import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import dayjs from "dayjs";
import { Link } from "expo-router";

export default function Tab() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const response = await fetch(
        "http://ec2-54-227-130-80.compute-1.amazonaws.com:3000",
      );
      const sessions = await response.json();
      console.log(sessions);
      setSessions(sessions);
    }
    fetchSessions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sessionsContainer}>
        {sessions.map((session) => (
          <View key={session._id} style={styles.dateContainer}>
            <Link
              href={{
                pathname: "saved-sessions/[session]",
                params: { session: session._id },
              }}
            >
              <Text>
                {dayjs(session.start_time).format("MMMM D, YYYY h:mm A")}
              </Text>
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sessionsContainer: {
    marginTop: 20,
    width: "100%",
  },
  dateContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
});
