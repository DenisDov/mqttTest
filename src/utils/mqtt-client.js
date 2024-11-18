import {connect} from 'mqtt';

const mqttUrl = 'ws://broker.hivemq.com:8000/mqtt'; // WebSocket URL for Mosquitto test server

export const createMqttClient = () => {
  const client = connect(mqttUrl);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('presence', err => {
      if (!err) {
        console.log('Subscribed to presence topic');
        client.publish('presence', 'Hello mqtt');
      }
    });
    client.subscribe('your/topic', err => {
      if (!err) {
        console.log('Subscribed to topic');
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
