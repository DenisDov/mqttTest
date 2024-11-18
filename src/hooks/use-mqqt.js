import {useEffect, useState} from 'react';
import {connect} from 'mqtt';

//https://www.mqtt-dashboard.com/
const mqttUrl = 'ws://broker.hivemq.com:8000/mqtt';

export const useMqttClient = () => {
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const mqttClient = connect(mqttUrl);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setStatus('connected');

      const subscribeToTopic = topic => {
        mqttClient.subscribe(topic, err => {
          if (!err) {
            console.log(`Subscribed to ${topic} topic`);
            if (topic === 'presence') {
              mqttClient.publish('presence', 'Hello mqtt');
            }
          } else {
            console.error(`Failed to subscribe to ${topic}:`, err);
          }
        });
      };

      subscribeToTopic('presence');
      subscribeToTopic('gps/tracker');
    });

    mqttClient.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });

    mqttClient.on('error', error => {
      console.error('MQTT Error:', error);
      setStatus('error');
    });

    mqttClient.on('offline', () => {
      console.warn('MQTT client is offline');
      setStatus('offline');
    });

    mqttClient.on('reconnect', () => {
      console.log('Reconnecting to MQTT broker');
      setStatus('reconnecting');
    });

    mqttClient.on('close', () => {
      console.log('MQTT connection closed');
      setStatus('closed');
    });

    mqttClient.on('disconnect', () => {
      console.log('Disconnected from MQTT broker');
      setStatus('disconnected');
    });

    mqttClient.on('end', () => {
      console.log('MQTT connection ended');
      setStatus('ended');
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  return {client, status};
};
