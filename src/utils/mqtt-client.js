import {connect} from 'mqtt';

// https://www.hivemq.com/demos/websocket-client/
const mqttUrl = 'wss://mqtt-dashboard.com:8884/mqtt'; // WebSocket URL

export const createMqttClient = () => {
  const client = connect(mqttUrl, {
    clientId: 'clientId-bRGDUtDpOu',
  });

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('presence', err => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log('Subscribed to presence topic');
        client.publish('presence', 'Hello mqtt');
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);
  });

  client.on('error', error => {
    console.error('MQTT Error:', error);
  });

  client.on('offline', () => {
    console.warn('MQTT client is offline');
  });

  client.on('reconnect', () => {
    console.log('Reconnecting to MQTT broker');
  });

  client.on('close', () => {
    console.log('MQTT connection closed');
  });

  client.on('end', () => {
    console.log('MQTT connection ended');
  });

  return client;
};
