import { View, Button, Text} from "react-native"
import { useMqtt } from "../context/MqttContext"

export default function StartButton() {
  const { mqttClient, mqttStatus } = useMqtt()

  const handlePressStart = () => {
    mqttClient.publish("smartbike/inel00/session/start", "hola")
  }

  const handlePressStop = () => {
    mqttClient.publish("smartbike/inel00/session/stop", "chau")
  }

  return (
    <View>
      <Text>Connection status: {mqttStatus}</Text>
      <Button onPress={handlePressStart} title="Start" />
      <Button onPress={handlePressStop} title="Stop" />
    </View>
  )
}