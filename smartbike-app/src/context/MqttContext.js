import { createContext, useContext, useState } from "react";
import useMqttConnection from "../hooks/useMqttConnection";
import useAppStateBackground from "../hooks/useAppStateReconnect";

const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
  const [doMqttConnection, setDoMqttConnection] = useState(true);
  const {
    mqttClient,
    mqttData,
    mqttStatus,
    mqttError,
    setMqttError,
    setMqttStatus,
  } = useMqttConnection(doMqttConnection);

  useAppStateBackground(mqttClient);

  const subscribeToTopic = (topics, { qos = 1 } = {}) => {
    if (!mqttClient) return;

    for (const topic of topics) {
      mqttClient.subscribe(topic, { qos }, (error, granted) => {
        if (error) {
          setMqttStatus(`TopicError: ${topic}`);
          setMqttError(
            `Name: ${error?.name}\nMessage: ${error?.message}\nCode: ${error?.code}`,
          );
        }
      });
    }
  };

  return (
    <MqttContext.Provider
      value={{
        mqttClient,
        mqttData,
        mqttStatus,
        mqttError,
        subscribeToTopic,
        setDoMqttConnection,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
