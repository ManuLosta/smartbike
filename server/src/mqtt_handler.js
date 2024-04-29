import mqtt from "mqtt";

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = "mqtt://ec2-54-211-108-43.compute-1.amazonaws.com:1883";
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

        this.mqttClient.subscribe("/test/topic/1", { qos: 0 });

        this.mqttClient.on("message", (topic, message) => {
            console.log(`${message} received from topic ${topic}`);
        })

        this.mqttClient.on("close", () => {
            console.log(`mqtt client disconnected`);
        });
    }

    publish(topic, message) {
        this.mqttClient.publish(topic, message);
    }
}

export default MqttHandler;
