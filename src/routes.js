import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    App: createStackNavigator({
      Dashboard: {
        screen: Dashboard,
        navigationOptions: ({navigation}) => ({
          title: 'Inicio',
          // headerRight: (
          //   <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          //     <Icon
          //       style={{marginRight: 20}}
          //       name="chat-processing"
          //       size={24}
          //       color="#000000"
          //     />
          //   </TouchableOpacity>
          // ),
        }),
      },
      Cadastrar: {
        screen: Cadastro,
        navigationOptions: ({navigation}) => ({
          title: 'Cadastrar Usuário',
          // headerRight: (
          //   <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          //     <Icon
          //       style={{marginRight: 20}}
          //       name="chat-processing"
          //       size={24}
          //       color="#000000"
          //     />
          //   </TouchableOpacity>
          // ),
        }),
      },
    }),
  })
);
