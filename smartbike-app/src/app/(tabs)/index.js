import {View, StyleSheet } from "react-native";
import StartButton from "../../components/StartButton";
import SessionStats from "../../components/SessionStats";
import {StatusBar} from "expo-status-bar";
import Constants from "expo-constants/src/Constants";

export default function Tab() {
  return (
    <View style={styles.container}>
      <SessionStats/>
      <StartButton/>
      <StatusBar style=""/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
});
