#include <Arduino.h>

#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient WIFI_CLIENT;
PubSubClient MQTT_CLIENT;

int LED_BUILTIN = 23;

// Nombre y contraseña red WiFi.
const char *ssid = "UA-Alumnos";
const char *password = "41umn05WLC";

void reconnect()
{
  MQTT_CLIENT.setServer("ec2-3-92-132-184.compute-1.amazonaws.com", 1883);
  MQTT_CLIENT.setClient(WIFI_CLIENT);
  while (!MQTT_CLIENT.connected())
  {
    Serial.println("Attempting MQTT connection...");
    if (MQTT_CLIENT.connect("XJXT061651656845165416"))
    {
      Serial.println("Connected to MQTT broker");
      MQTT_CLIENT.subscribe("test/topic/1");
    }
    else
    {
      Serial.print("Failed, rc=");
      Serial.print(MQTT_CLIENT.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message received on topic: ");
  Serial.print(topic);
  Serial.print(", Payload: ");
  for (int i = 0; i < length; i++)
  {
    char receivedChar = (char)payload[i];
    Serial.print(receivedChar);
  }
  Serial.println();
}

void setup()
{
  Serial.begin(115200);
  delay(10);

  // Conectar con WiFi.
  Serial.println();
  Serial.print("Conectando con ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado.");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  // Configuración de la respuesta.
  MQTT_CLIENT.setCallback(callback);
  MQTT_CLIENT.setCallback(callback);
}

void loop()
{
  if (!MQTT_CLIENT.connected())
  {
    reconnect();
  }
  delay(5000);
}
