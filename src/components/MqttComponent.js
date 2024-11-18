import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {createMqttClient} from '../utils/mqtt-client';

const MqttComponent = () => {
  const client = createMqttClient();

  useEffect(() => {
    // Clean up the client on component unmount
    return () => {
      client.end();
    };
  }, [client]);

  return (
    <View>
      <Text>MQTT Client is running...</Text>
      <Button
        title="Send Message"
        onPress={() => client.publish('testtopic/1', 'Hello MQTT')}
      />
    </View>
  );
};

export default MqttComponent;
