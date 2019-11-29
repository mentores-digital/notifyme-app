import React from 'react';
import {SafeAreaView, Text} from 'react-native';

export default function Login({navigation}) {
  const id = navigation.getParam('user');

  return (
    <SafeAreaView>
      <Text>{id}</Text>
    </SafeAreaView>
  );
}
