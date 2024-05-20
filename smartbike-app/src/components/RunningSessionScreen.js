import { View, Button, Text} from "react-native"
import { useMqtt } from "../context/MqttContext"
import { useEffect } from "react"

export default function RunningSessionScreen() {

    const { mqttClient, mqttStatus, subscribeToTopic, mqttData, mqttError } = useMqtt()



    useEffect(() => {
        subscribeToTopic(["smartbike/inel00/01/data/speed"], {qos: 1})
        console.log("Subscribed to topic")
    }, [mqttClient])

    return(
        <View>
            <Text>Connection status: {mqttStatus}</Text>
            <Text>Speed: {mqttData.message}</Text>
            <Text>Topic:. {mqttData.topic}</Text>
            <Text>Error: {mqttError}</Text>
        </View>
    )


}