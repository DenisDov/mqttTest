import React from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import MqttComponent from './src/components/MqttComponent';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // style={backgroundStyle}
        style={{flex: 1, backgroundColor: 'bisque'}}>
        <View style={{flex: 1}}>
          <MqttComponent />
          {/* <Text>Hello</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default App;
