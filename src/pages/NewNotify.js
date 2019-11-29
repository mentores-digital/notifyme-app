import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';

export default function Login({navigation}) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
