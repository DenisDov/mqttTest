import {useEffect, useState} from 'react';
import {connect} from 'mqtt';

const mqttUrl = 'ws://broker.hivemq.com:8000/mqtt';

export const useMqttClient = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = connect(mqttUrl);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('presence', err => {
        if (!err) {
          console.log('Subscribed to presence topic');
          mqttClient.publish('presence', 'Hello mqtt');
        }
      });
      mqttClient.subscribe('your/topic', err => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });

    mqttClient.on('error', error => {
      console.error('MQTT Error:', error);
    });

    mqttClient.on('offline', () => {
      console.warn('MQTT client is offline');
    });

    mqttClient.on('reconnect', () => {
      console.log('Reconnecting to MQTT broker');
    });

    mqttClient.on('close', () => {
      console.log('MQTT connection closed');
    });

    mqttClient.on('end', () => {
      console.log('MQTT connection ended');
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  return client;
};
