import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AsyncStorage from '@react-native-community/async-storage';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewNotify from './pages/NewNotify';
import Cadastro from './pages/Cadastro';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconLine from 'react-native-vector-icons/SimpleLineIcons';
Icon.loadFont();
IconLine.loadFont();

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Cadastro,
    App: createStackNavigator(
      {
        Dashboard: {
          screen: Dashboard,
          navigationOptions: ({navigation}) => ({
            headerLeft: (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Icon
                  style={{marginLeft: 20, marginRight: 10}}
                  name="notifications-none"
                  size={24}
                  color="#0041c4"
                />
                <Text style={styles.title}>Notificações</Text>
              </TouchableOpacity>
            ),
            headerRight: (
              <IconLine
                style={{marginRight: 20}}
                name="options"
                size={20}
                color="#0041c4"
              />
            ),
          }),
        },
        NewNotify: {
          screen: NewNotify,
          navigationOptions: {
            header: null,
          },
        },
      },
      {
        transitionConfig: () => ({
          transitionSpec: {
            duration: 300,
          },
          screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.99, index],
              outputRange: [0, 1, 1],
            });

            return {opacity, transform: [{translateY}]};
          },
        }),
      }
    ),
  })
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.91,
    color: '#0041c4',
  },
  button: {
    flexDirection: 'row',
  },
});
