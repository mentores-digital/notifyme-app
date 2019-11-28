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
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../assets/logo.png';
import background from '../assets/background.png';

import api from '../services/api';

Icon.loadFont();

export default function Login() {
  const [lembrarMe, setLembrarMe] = useState(false);
  const [ocultarSenha, setOcultarSenha] = useState(true);

  async function handleLogin() {}

  return (
    <ImageBackground
      source={background}
      style={{width: '100%', height: '100%'}}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <Text style={styles.description}>Envie e receba notificações.</Text>

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Login"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          style={styles.input}
          textContentType="username"
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => setLembrarMe(!lembrarMe)}>
            <View style={styles.rowContainer}>
              <View
                style={lembrarMe ? styles.checkBoxChecked : styles.checkBox}>
                {lembrarMe && (
                  <Icon name="check-bold" size={18} color="#246bff" />
                )}
              </View>
              <Text style={styles.option}>Lembrar-me</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.option}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
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
    fontWeight: '100',
    color: '#fff',
    fontFamily: 'Montserrat',
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
  },
});
