import React from 'react';
import {View, Text, Button} from 'react-native';
import {useMqttClient} from '../hooks/use-mqqt';

const MqttComponent = () => {
  const {client, status} = useMqttClient();

  return (
    <View>
      <Text>MQTT Client is {status}</Text>
      <Button
        title="SEND COORDINATES"
        onPress={() => client.publish('gps/tracker', 'lat:123,lon:123')}
      />
    </View>
  );
};

export default MqttComponent;
