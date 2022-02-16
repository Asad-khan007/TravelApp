// import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import Image from '../Assets/images/background.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [Refreshing, setRefreshing] = useState(false);

  const Signup = async () => {
    if (password === confirmPassword && phone.length) {
      try {
        setRefreshing(true);
        let user = await auth().createUserWithEmailAndPassword(email, password);
        let database = await firestore().collection('Users').add({
          name,
          email,
          phone,
        });
        setRefreshing(false);
        console.warn('database', database);
        console.warn('Regusterd', user);
        navigation.push('Dashboard');
      } catch (e) {
        // console.warn('Error===');
        Alert.alert('Error', e.message);
      }
    } else Alert.alert('Error', 'Passwords doesnt match');
  };

  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={<RefreshControl refreshing={Refreshing} />}>
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          {/* <ImageBackground
          source={Image}
          resizeMode="stretch"
          style={styles.bg}
        /> */}
        </View>
        <View style={styles.header1}>
          <Text style={styles.font1}>Welcome Onboard!</Text>
          <Text style={styles.font2}>Let's help you meet your tasks</Text>
        </View>
        <View style={styles.inputFeild}>
          <TextInput
            value={name}
            placeholder="Enter your full name"
            placeholderTextColor={'black'}
            style={styles.input1}
            onChangeText={val => setName(val)}
          />
          <TextInput
            value={email}
            placeholder="Enter your email"
            placeholderTextColor={'black'}
            style={styles.input1}
            onChangeText={val => setEmail(val)}
          />
          <TextInput
            value={password}
            placeholder="Enter password"
            placeholderTextColor={'black'}
            onChangeText={val => setPassword(val)}
            style={styles.input1}
          />
          <TextInput
            value={confirmPassword}
            placeholder="Confrom password"
            placeholderTextColor={'black'}
            onChangeText={val => setConfirmPassword(val)}
            style={styles.input1}
          />
          <TextInput
            value={phone}
            placeholder="Phone"
            placeholderTextColor={'black'}
            onChangeText={val => setPhone(val)}
            style={styles.input1}
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity onPress={Signup} style={styles.btnContainer}>
          <Text style={styles.btn}>Register</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.footerBottom}
            onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.ligter}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: '10%',
    backgroundColor: '#ebecef',
    // justifyContent: 'center',
  },
  bgContainer: {
    width: '100%',
  },
  bg: {
    width: '100%',
    paddingVertical: '10%',
  },
  header1: {
    marginTop: '10%',
    alignItems: 'center',
  },
  font1: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  font2: {
    fontSize: 15,
  },
  inputFeild: {
    marginTop: '15%',
    alignItems: 'center',
    // backgroundColor: 'black',
    width: '100%',
    paddingHorizontal: '10%',
  },
  input1: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    // height: 40,
    paddingVertical: 10,
    color: 'black',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3d00',
    width: '80%',
    // height: 40,
    // paddingHorizontal: '10%',
    paddingVertical: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  btn: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  footer: {
    // paddingVertical: 25,
    marginTop: 25,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },
  footerText: {
    fontSize: 16,
    color: 'black',
  },
  ligter: {
    color: '#ff3d00',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  footerBottom: {
    // backgroundColor: '#ff3d00',
  },
});
