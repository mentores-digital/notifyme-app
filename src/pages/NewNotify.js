import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  Switch,
  StyleSheet,
} from 'react-native';

import api from '../services/api';

export default function Login({navigation}) {
  const [tipo, setTipo] = useState('low');
  const [horarioEnvio, setHorarioEnvio] = useState('now');
  const [periodoAcesso, setPeriodoAcesso] = useState('');
  const [receber, setReceber] = useState(false);
  const [to, setTo] = useState([]);

  async function loadUsers() {
    const response = await api.get('/users', {
      headers: {
        user: AsyncStorage.getItem('user'),
      },
    });
    setTo(response.data);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.botaoHeader}>Cancelar</Text>
        </TouchableOpacity>

        <Text style={styles.tituloHeader}>Nova Notificação</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.botaoHeader}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Tipo de notificação</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={tipo}
              style={{height: 40, width: '100%'}}
              itemStyle={styles.selectItem}
              onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
              <Picker.Item label="Baixo" value="low" />
              <Picker.Item label="Médio" value="medium" />
              <Picker.Item label="Urgente" value="urgent" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Título</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Título"
            placeholderTextColor="#303030"
            style={styles.input}
            textContentType="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Descrição</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Descrição"
            placeholderTextColor="#303030"
            style={styles.input}
            textContentType="username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Horário de envio</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={horarioEnvio}
              style={{height: 40, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                setHorarioEnvio(itemValue)
              }>
              <Picker.Item label="Imediato" value={new Date()} />
              <Picker.Item label="Amanhã" value={new Date()} />
              <Picker.Item label="Próxima Semana" value={new Date()} />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Período de acesso</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={periodoAcesso}
              style={{height: 40, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                setPeriodoAcesso(itemValue)
              }>
              <Picker.Item label="Indeterminado" value={new Date()} />
              <Picker.Item label="1 Dia" value="d" />
              <Picker.Item label="1 Semana" value="s" />
              <Picker.Item label="1 Mês" value="m" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Notificação</Text>
          <View style={styles.input}>
            <Text style={styles.inputReceber}>Receber notificação</Text>
            <Switch
              style={{marginTop: 30}}
              value={receber}
              onValueChange={val => setReceber(val)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Enviar para</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={periodoAcesso}
              mode="dialog"
              style={{height: 40, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                setPeriodoAcesso(itemValue)
              }>
              <Picker.Item label="Todos" value="todos" />
              {/* {to.map(user => (
                <Picker.Item label={user.username} value={user._id} />
              ))} */}
            </Picker>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  botaoHeader: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    letterSpacing: -0.64,
    color: '#0041c4',
  },

  tituloHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    letterSpacing: -0.64,
    color: '#000',
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 65, 196, 0.1)',
    padding: 20,
    paddingBottom: 200,
  },

  inputContainer: {
    marginBottom: 30,
  },

  legenda: {
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    letterSpacing: -0.25,
    color: '#c1c7d0',
  },

  input: {
    height: 40,
    alignSelf: 'stretch',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    lineHeight: 1.57,
    color: '#303030',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottomColor: '#0041c4',
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },

  selectItem: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    lineHeight: 1.57,
    color: '#303030',
    padding: 0,
    margin: 0,
    textAlign: 'left',
  },

  inputReceber: {
    height: 40,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#303030',
    justifyContent: 'center',
  },
});
