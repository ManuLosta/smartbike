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
  const protocolVersion = 5

  const client = mqtt.connect(`${protocol}://${host}`, {
    port,
	clientId: uniqueId, 
	clean: true,
	reconnectPeriod: 500,
	keepalive: 30, 
	resubscribe: true,
	queueQoSZero: true,
	properties: protocolVersion === 5 ? { sessionExpiryInterval: 600 } : {},
	protocolVersion,
	protocol
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
		console.log('Received message:', { topic, message: message.toString() })
		onMessage(topic, message)
	})

  return client
} 

export { createMqttClient }