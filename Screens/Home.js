import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import Logo from '../Assets/images/todo-list-icon.jpg';
import Signup from './Signup';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <View style={styles.header1}>
        <Text style={styles.font1}>Get things done with TODo</Text>
        <View style={styles.header2}>
          <Text style={styles.font2}>Lorem ipsum dolor sit amet</Text>
          <Text style={styles.font2}>consectetur adipiscing elit. Amet.</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.btn}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header1: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: '20%',
  },
  font1: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  header2: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  font2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnContainer: {
    height: '8%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3d00',
    marginTop: 70,
    borderRadius: 10,
  },
  btn: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
