import { View, StyleSheet, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Stat({ name, icon, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.nameContainer}>
        <FontAwesome6 name={icon} size={20} />
        <Text style={styles.name}>{name}</Text>
        <View />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontWeight: "bold",
    fontSize: 42,
  },
  name: {
    color: "#808080",
    fontWeight: "light",
  },
});
