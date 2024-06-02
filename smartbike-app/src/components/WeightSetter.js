import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from Expo icons
import { useMqtt } from "../context/MqttContext";
import { useEffect } from "react";

export default function WeightSetter() {
  const [weight, setWeight] = useState(60);
  const { mqttClient, mqttStatus } = useMqtt();

  const onIncrement = () => setWeight(weight + 1);
  const onDecrement = () => setWeight(weight - 1);
  const onSave = () => {
    mqttClient.publish("smartbike/inel00/set/weight", weight.toString());
    // Replace with your save logic
    console.log("Saving weight:", weight);
    // Example of saving to AsyncStorage
    // AsyncStorage.setItem('user_weight', JSON.stringify(weight));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Peso</Text>
      <View style={styles.weightContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrement}>
          <FontAwesome name="minus" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.weightText}>{weight} kg</Text>
        <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <FontAwesome name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 24,
    marginBottom: 10,
  },
  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  weightText: {
    fontSize: 24,
    marginHorizontal: 20,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveText: {
    color: "white",
    fontSize: 20,
  },
});
