import mqtt from "mqtt";

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = "";
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

        this.mqttClient.subscribe("topic", { qos: 0 });

        this.mqttClient.on("close", () => {
            console.log(`mqtt client disconnected`);
        });
    }
}

export default MqttHandler;