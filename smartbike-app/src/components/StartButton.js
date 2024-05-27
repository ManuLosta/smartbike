import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useMqtt } from "../context/MqttContext";
import { useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function StartButton() {
  const { mqttClient, mqttStatus } = useMqtt();

  const handlePressStart = () => {
    mqttClient.publish("smartbike/inel00/session/start", "hola");
  };

  const handlePressStop = () => {
    mqttClient.publish("smartbike/inel00/session/stop", "chau");
  };

  useEffect(() => {
    console.log("MQTT Status:", mqttStatus); // Add debug log
  }, [mqttStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handlePressStart}>
          <FontAwesome name="play" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePressStop}>
          <Ionicons name="pause-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.statusContainer,
          mqttStatus === "Connected" ? styles.connected : styles.disconnected,
        ]}
      >
        <Text style={styles.statusText}>Connection status: {mqttStatus}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  statusContainer: {
    padding: 10,
    margin: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  connected: {
    backgroundColor: 'limegreen',
  },
  disconnected: {
    backgroundColor: 'grey',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
