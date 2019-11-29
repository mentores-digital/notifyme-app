import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
IconAntDesign.loadFont();
Icon.loadFont();

import api from '../services/api';

export default function Dashboard({navigation}) {
  const [notifys, setNotifys] = useState(null);

  const id = navigation.getParam('user');

  useEffect(() => {
    async function data() {
      const response = await api.get(`/notify/${id}`);
      setNotifys(response.data);
    }
    data();
  }, [id]);

  function typeStyle(item) {
    if (item.type === 'low') {
      return styles.notifyNivelLow;
    } else {
      if (item.type === 'medium') {
        return styles.notifyNivelMedium;
      } else {
        return styles.notifyNivelUrgent;
      }
    }
  }

  return (
    <View style={styles.content}>
      <View style={styles.statusContainer}>
        <View style={styles.statusPlus}>
          <View style={styles.statusIcon}>
            <IconAntDesign name="arrowup" size={24} color="#0041c4" />
          </View>
          <View style={styles.statusInfos}>
            <Text style={styles.statusTitle}>Notificações</Text>
            <Text style={styles.statusNumber}>+980</Text>
          </View>
        </View>
        <View style={styles.statusPlus}>
          <View style={styles.statusIconNeg}>
            <IconAntDesign name="arrowdown" size={24} color="#e31b4b" />
          </View>
          <View style={styles.statusInfos}>
            <Text style={styles.statusTitle}>Abertura</Text>
            <Text style={styles.statusNumber}>-12</Text>
          </View>
        </View>
      </View>
      <View style={styles.toogleMenu}>
        <Text style={styles.textMenuAtive}>Recentes</Text>
        <Text style={styles.textMenu}>Programadas</Text>
        <Text style={styles.textMenu}>Histórico</Text>
      </View>
      <ScrollView style={styles.list}>
        {notifys && (
          <>
            {notifys.today.length && (
              <View style={styles.blockNotify}>
                <Text style={styles.blockNotifyTitle}>Hoje</Text>
                {notifys.today.map((item, index) => (
                  <View style={styles.notify} key={String(index)}>
                    <View style={typeStyle(item)} />
                    <View style={styles.notifyInfos}>
                      <Text style={styles.notifyTitle}>{item.title}</Text>
                      <Text style={styles.notifyHorario}>{item.hour}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            {notifys.yesterday.length && (
              <View style={styles.blockNotify}>
                <Text style={styles.blockNotifyTitle}>Ontem</Text>
                <>
                  {notifys.yesterday.map((item, index) => (
                    <View style={styles.notify} key={String(index)}>
                      <View style={typeStyle(item)} />
                      <View style={styles.notifyInfos}>
                        <Text style={styles.notifyTitle}>{item.title}</Text>
                        <Text style={styles.notifyHorario}>{item.hour}</Text>
                      </View>
                    </View>
                  ))}
                </>
              </View>
            )}
            {notifys.week.length && (
              <View style={styles.blockNotify}>
                <Text style={styles.blockNotifyTitle}>Essa semana</Text>
                <>
                  {notifys.week.map((item, index) => (
                    <View style={styles.notify} key={String(index)}>
                      <View style={typeStyle(item)} />
                      <View style={styles.notifyInfos}>
                        <Text style={styles.notifyTitle}>{item.title}</Text>
                        <Text style={styles.notifyHorario}>{item.hour}</Text>
                      </View>
                    </View>
                  ))}
                </>
              </View>
            )}
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonPlus}
        onPress={() => navigation.navigate('NewNotify')}>
        <IconAntDesign name="plus" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  buttonPlus: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#0041c4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: 'rgba(0, 65, 196, 0.3)',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 5,
    },
  },
  formCadastroNotify: {
    position: 'absolute',
    left: 0,
    top: '100%',
    width: '100%',
    height: '100%',
  },
  formCadastroNotifyShow: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    zIndex: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 140,
    borderColor: '#ececec',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingRight: 60,
    zIndex: 10,
  },
  statusPlus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusMinus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    width: 50,
    height: 50,
    borderRadius: 7.5,
    backgroundColor: 'rgba(0, 65, 196, 0.1)',
  },
  statusIconNeg: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    width: 50,
    height: 50,
    borderRadius: 7.5,
    backgroundColor: 'rgba(227, 27, 75, 0.1)',
  },
  statusInfos: {
    justifyContent: 'space-between',
  },
  statusTitle: {
    fontSize: 15,
    letterSpacing: -0.25,
    color: '#c1c7d0',
  },
  statusNumber: {
    fontSize: 20,
    letterSpacing: -1,
    color: '#303030',
  },
  toogleMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    borderColor: '#ececec',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  textMenu: {
    fontSize: 18,
    letterSpacing: -0.5,
    color: '#c1c7d0',
  },
  textMenuAtive: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    color: '#0041c4',
  },
  list: {
    flex: 1,
    backgroundColor: 'rgba(0, 65, 196, 0.1)',
    padding: 30,
  },
  blockNotify: {
    width: '100%',
    borderBottomColor: 'rgba(0, 65, 196, 0.1)',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  blockNotifyTitle: {
    opacity: 0.3,
    fontSize: 10,
    color: '#0041c4',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  notify: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  notifyNivelLow: {
    width: 42,
    height: 42,
    opacity: 0.1,
    borderRadius: 50,
    backgroundColor: '#ffc805',
    marginRight: 15,
  },
  notifyNivelMedium: {
    width: 42,
    height: 42,
    opacity: 0.1,
    borderRadius: 50,
    backgroundColor: '#0041c4',
    marginRight: 15,
  },
  notifyNivelUrgent: {
    width: 42,
    height: 42,
    opacity: 0.1,
    borderRadius: 50,
    backgroundColor: '#ff8385',
    marginRight: 15,
  },
  notifyInfos: {
    flex: 1,
  },
  notifyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0041c4',
    marginBottom: 7,
  },
  notifyHorario: {
    opacity: 0.3,
    fontSize: 12,
    color: '#0041c4',
  },
});
