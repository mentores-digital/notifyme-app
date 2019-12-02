import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import RNPickerSelect from 'react-native-picker-select';

import api from '../services/api';

export default function Login({navigation}) {
  const [tipo, setTipo] = useState('low');
  const [horarioEnvio, setHorarioEnvio] = useState('2019-12-02T19:15:13.326Z');
  const [periodoAcesso, setPeriodoAcesso] = useState(
    '2019-12-02T19:15:13.326Z'
  );
  const [receber, setReceber] = useState(false);
  const [to, setTo] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [titulo, onChangeTitulo] = useState('');
  const [descricao, onChangeDescricao] = useState('');

  useEffect(() => {
    async function loadUsers() {
      const user = await AsyncStorage.getItem('user');

      const response = await api.get('/users', {
        headers: {
          user,
        },
      });
      setTo(response.data);
    }
    loadUsers();
  }, []);

  const _multiSelect = useRef();

  async function saveNotification() {
    const user = await AsyncStorage.getItem('user');

    const response = await api.post(
      '/notify',
      {
        type: tipo,
        title: titulo,
        description: descricao,
        hour: horarioEnvio,
        receive: receber,
        to: selectedUsers,
      },
      {
        headers: {
          user,
        },
      }
    );

    console.log(response);
    navigation.navigate('Dashboard');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.botaoHeader}>Cancelar</Text>
        </TouchableOpacity>

        <Text style={styles.tituloHeader}>Nova Notificação</Text>

        <TouchableOpacity onPress={saveNotification}>
          <Text style={styles.botaoHeader}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Tipo de notificação</Text>
          <View style={styles.input}>
            <RNPickerSelect
              value={tipo}
              onValueChange={value => setTipo(value)}
              items={[
                {label: 'Baixo', value: 'low'},
                {label: 'Médio', value: 'medium'},
                {label: 'Urgente', value: 'urgent'},
              ]}
              placeholder={{}}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Título</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Título"
            placeholderTextColor="#303030"
            onChangeText={text => onChangeTitulo(text)}
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
            onChangeText={text => onChangeDescricao(text)}
            style={styles.input}
            textContentType="username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Horário de envio</Text>
          <View style={styles.input}>
            <RNPickerSelect
              value={horarioEnvio}
              onValueChange={value => setHorarioEnvio(value)}
              items={[
                {label: 'Imediato', value: '2019-12-02T19:15:13.326Z'},
                {label: 'Amanhã', value: '2019-12-03T19:15:13.326Z'},
                {label: 'Próxima Semana', value: '2019-12-09T19:15:13.326Z'},
              ]}
              placeholder={{}}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Período de acesso</Text>
          <View style={styles.input}>
            <RNPickerSelect
              value={periodoAcesso}
              onValueChange={value => setPeriodoAcesso(value)}
              items={[
                {label: 'Indeterminado', value: '2019-12-02T19:15:13.326Z'},
                {label: '1 Dia', value: '2019-12-03T19:15:13.326Z'},
                {label: '1 Semana', value: '2019-12-09T19:15:13.326Z'},
                {label: '1 Mês', value: '2020-01-02T19:15:13.326Z'},
              ]}
              placeholder={{}}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.legenda}>Notificação</Text>
          <View style={styles.input}>
            <View style={styles.inputReceber}>
              <Text>Receber notificação</Text>
              <TouchableWithoutFeedback onPress={() => setReceber(!receber)}>
                {receber ? (
                  <View style={styles.switchActive}>
                    <View style={styles.switchBallActive} />
                  </View>
                ) : (
                  <View style={styles.switch}>
                    <View style={styles.switchBall} />
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        <View style={styles.lastContainer}>
          <Text style={styles.legenda}>Enviar para</Text>
          <MultiSelect
            hideTags
            items={to}
            uniqueKey="_id"
            ref={_multiSelect}
            onSelectedItemsChange={val => setSelectedUsers(val)}
            selectedItems={selectedUsers}
            selectText="Usuários"
            searchInputPlaceholderText="Encontrar usuário..."
            onChangeInput={text => console.log(text)}
            altFontFamily="Montserrat-Regular"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="username"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#CCC"
            submitButtonText="Escolher"
          />
          <View>
            {_multiSelect.current &&
              _multiSelect.current.getSelectedItemsExt(selectedUsers)}
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

  lastContainer: {
    marginBottom: 300,
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
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#aaa',
  },

  switchActive: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0041c4',
  },

  switchBall: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },

  switchBallActive: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});
