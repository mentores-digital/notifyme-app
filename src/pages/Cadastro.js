import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../assets/logo.png';
import background from '../assets/background.png';

import api from '../services/api';

Icon.loadFont();

export default function Cadastro({navigation}) {
  const [ocultarSenha, setOcultarSenha] = useState(true);

  const [role] = useState('admin');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleCadastro() {
    const response = await api.post('/users', {
      username,
      email,
      password,
      role,
    });

    const {error} = response.data;

    if (error) {
      return Alert.alert('Erro', error);
    }

    navigation.navigate('Login');
  }

  return (
    <ImageBackground
      source={background}
      style={{width: '100%', height: '100%'}}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <Text style={styles.description}>Cadastro de Usuário.</Text>

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Login"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          style={styles.input}
          textContentType="username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          style={styles.input}
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.rowContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            secureTextEntry={ocultarSenha}
            textContentType="password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setOcultarSenha(!ocultarSenha)}
            style={styles.passwordEye}>
            {ocultarSenha ? (
              <Icon name="eye" size={22} color="#fff" />
            ) : (
              <Icon name="eye-off" size={22} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.option}>Voltar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    width: 158.2,
    height: 40,
    tintColor: '#fff',
  },

  description: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Montserrat-Light',
  },

  input: {
    height: 60,
    width: '100%',
    alignSelf: 'stretch',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 7,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordEye: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },

  checkBox: {
    width: 24,
    height: 24,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkBoxChecked: {
    width: 24,
    height: 24,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: '#0041c4',
    borderRadius: 7,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },

  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 49,
  },

  option: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
});
