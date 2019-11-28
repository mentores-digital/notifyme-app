import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconLine from 'react-native-vector-icons/SimpleLineIcons';
Icon.loadFont();
IconLine.loadFont();

import {Text, StyleSheet} from 'react-native';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    App: createStackNavigator({
      Dashboard: {
        screen: Dashboard,
        navigationOptions: ({navigation}) => ({
          headerLeft: (
            <>
              <Icon
                style={{marginLeft: 20, marginRight: 10}}
                name="notifications-none"
                size={24}
                color="#0041c4"
              />
              <Text style={styles.title}>Notificações</Text>
            </>
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
    }),
  })
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.91,
    color: '#0041c4',
  },
});
