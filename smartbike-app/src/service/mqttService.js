import mqtt from "mqtt";

function createMqttClient({
	setMqttStatus,
	setMqttError,
	uniqueId,
	onMessage,
}) {
  const host = process.env.EXPO_PUBLIC_MQTT_HOST;
  const protocol = 'ws';
  const port = process.env.EXPO_PUBLIC_MQTT_PORT;

  const client = mqtt.connect(`${protocol}://${host}`, {
    port
  })
  .on('connect', () => {
    setMqttStatus("Connected")
  })
  .on('error', (error) => {
		setMqttStatus('Error')
		setMqttError(`Name: ${error?.name}\nMessage: ${error?.message}\nCode: ${error?.code}`)
	})
	.on('disconnect', (packet) => {
		setMqttStatus('Disconnected')
	})
	.on('offline', () => {
		setMqttStatus('Offline')
	})
	.on('reconnect', () => {
		setMqttStatus('Reconnecting')
	})
	.on('close', () => {
		setMqttStatus('Disconnected')
	})
  .on('message', (topic, message, packet) => {
		onMessage(topic, message)
	})

  return client
} 

export { createMqttClient }