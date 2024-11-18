import React from 'react';
import {View, Text, Button} from 'react-native';
import {useMqttClient} from '../hooks/use-mqqt';

const MqttComponent = () => {
  const client = useMqttClient();

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
