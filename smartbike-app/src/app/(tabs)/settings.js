import { View, StyleSheet } from "react-native";
import WeightSetter from "../../components/WeightSetter";

export default function Tab() {
  return (
    <View style={styles.container}>
      <WeightSetter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
