import { View, Button, Text} from "react-native"
import { useMqtt } from "../context/MqttContext"

export default function StartButton() {
  const { mqttClient, mqttStatus } = useMqtt()

  const handlePressStart = () => {
    mqttClient.publish("test", "hola")
  }

  const handlePressStop = () => {
    mqttClient.disconnect()
  }

  return (
    <View>
      <Text>Connection status: {mqttStatus}</Text>
      <Button onPress={handlePressStart} title="Start" />
      <Button onPress={handlePressStart} title="Stop" />
    </View>
  )
}