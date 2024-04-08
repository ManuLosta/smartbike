import mqtt from "mqtt";

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = "mqtt://ec2-44-203-174-42.compute-1.amazonaws.com:1883";
    }

    connect() {
        this.mqttClient = mqtt.connect(this.host);

        this.mqttClient.on("error", (err) => {
            console.log("An error has occured: ", err);
            this.mqttClient.end();
        });

        this.mqttClient.on("connect", () => {
            console.log(`Mqtt client connected`);
        });

        this.mqttClient.subscribe("test/topic1/message", { qos: 0 });

        this.mqttClient.on("message", (topic, message) => {
            console.log(`${message} received from topic ${topic}`);
        })

        this.mqttClient.on("close", () => {
            console.log(`mqtt client disconnected`);
        });
    }
}

export default MqttHandler;