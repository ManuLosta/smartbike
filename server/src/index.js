import express from "express"
import mongoose from "mongoose"

import MqttHandler from "./mqtt_handler.js";

const mqtt_handle = new MqttHandler();
mqtt_handle.connect()

const app = express()
app.use(express.json())

app.get("/on", (_req, res) => {
    mqtt_handle.publish("led/inel00/led/toggle", "1")
    res.json("ON");
})

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
})
