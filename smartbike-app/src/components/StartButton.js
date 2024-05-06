import { View, Button, Text} from "react-native"
import { useMqtt } from "../context/MqttContext"

export default function StartButton() {
  const { mqttClient, mqttStatus } = useMqtt()

  const handlePress = () => {
    mqttClient.publish("test", "hola")
  }

  return (
    <View>
      <Text>Connection status: {mqttStatus}</Text>
      <Button onPress={handlePress} title="Start" />
    </View>
  )
}