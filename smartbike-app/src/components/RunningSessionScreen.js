import { View, Text, StyleSheet } from "react-native";
import { useMqtt } from "../context/MqttContext";
import { useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import { AntDesign } from '@expo/vector-icons';


export default function RunningSessionScreen() {
  const { mqttClient, mqttStatus, subscribeToTopic, mqttData, mqttError } = useMqtt();

  useEffect(() => {
    subscribeToTopic(["smartbike/inel00/01/data/live"], { qos: 1 });
    console.log("Subscribed to topic");
  }, [mqttClient]);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Ionicons name="speedometer-outline" size={24} color="black" style={styles.icon} />
        <Text style={styles.dataText}>Speed: {mqttData.message?.speed || ""} km/h</Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" style={styles.icon} />
        <Text style={styles.dataText}>Distance: {mqttData.message?.distance || ""} m</Text>
      </View>
      <View style={styles.dataContainer}>
        <FontAwesome5 name="mountain" size={24} color="black" />
        <Text style={styles.dataText}>Altitude: {mqttData.message?.altitude || ""} m</Text>
      </View>
      <View style={styles.dataContainer}>
        <AntDesign name="up" size={24} color="black" />        
        <Text style={styles.dataText}>Positive Altitude: {mqttData.message?.p_altitude || ""} m</Text>
      </View>
      <View style={styles.dataContainer}>
        <Octicons name="flame" size={24} color="black" />      
        <Text style={styles.dataText}>Calories: {mqttData.message?.calories || ""} kcal</Text>
      </View>
      <View style={styles.dataContainer}>
        <AntDesign name="clockcircleo" size={24} color="black" />        
        <Text style={styles.dataText}>Duration: </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  dataText: {
    fontSize: 18,
  },
});
