import paho.mqtt.client as mqtt
import json
import time
import random

# Configuración del cliente MQTT
broker = "ec2-18-232-20-96.compute-1.amazonaws.com"
port = 1883
topic = "smartbike/inel00/01/data/live"

client = mqtt.Client()

# Generar datos inventados
def generate_data():
    data = {
        "speed": str(round(random.uniform(10.0, 30.0), 1)),
        "loc": {
            "lat": str(round(random.uniform(-90.0, 90.0), 6)),
            "lng": str(round(random.uniform(-180.0, 180.0), 6))
        },
        "distance": str(round(random.uniform(0.0, 20.0), 1)),
        "p_altitude": str(round(random.uniform(0.0, 30.0), 1)),
        "calories": str(random.randint(100, 500)),
        "altitude": str(round(random.uniform(0.0, 50.0), 1))
    }
    return json.dumps(data)

# Conectar y publicar
def on_connect(client, userdata, flags, rc):
    print("Conectado con código de resultado " + str(rc))

client.on_connect = on_connect

client.connect(broker, port, 60)

client.loop_start()

try:
    while True:
        json_data = generate_data()
        client.publish(topic, json_data)
        print(f"Publicado: {json_data}")
        time.sleep(3)
except KeyboardInterrupt:
    print("Desconexión del cliente MQTT")
    client.loop_stop()
    client.disconnect()
