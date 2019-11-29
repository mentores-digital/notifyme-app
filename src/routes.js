import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Cadastro,
    App: createStackNavigator({
      Dashboard: {
        screen: Dashboard,
        navigationOptions: ({navigation}) => ({
          title: 'Inicio',
          headerRight: (
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.clear();

                navigation.navigate('Login');
              }}>
              <Text>SAIR</Text>
            </TouchableOpacity>
          ),
        }),
      },
    }),
  })
);
