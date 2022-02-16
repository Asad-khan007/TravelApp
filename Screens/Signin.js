import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
// import React from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Image from '../Assets/images/desptop.png';
import auth from '@react-native-firebase/auth';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('khan@gmail.com');
  const [password, setPassword] = useState('123456');
  const [Refreshing, setRefreshing] = useState(false);

  const Login = async () => {
    if (email.length > 0 && password.length > 0) {
      try {
        setRefreshing(true);
        let credentialUser = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log('login User Success', credentialUser);
        setRefreshing(false);
        navigation.push('Dashboard');
      } catch (e) {
        Alert.alert('Error', e.message);
        console.log(e);
      }
    } else {
      Alert.alert('error', 'minimem letters 6');
    }
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={Refreshing} />}>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Text style={styles.headerfont1}>Welcome</Text>
          <Text style={styles.headerfont2}>Let's help you meet your tasks</Text>
        </View>
        <View style={styles.bgContainer}>
          <ImageBackground
            source={Image}
            resizeMode="contain"
            style={styles.bg}
          />
        </View>
        <View style={styles.inputFeild}>
          <TextInput
            style={styles.input1}
            value={email}
            onChangeText={val => setEmail(val)}
            placeholder="Enter your Email"
            placeholderTextColor={'black'}
          />
          <TextInput
            style={styles.input1}
            value={password}
            onChangeText={val => setPassword(val)}
            placeholder="Enter Password"
            placeholderTextColor={'black'}
          />
        </View>

        <TouchableOpacity style={styles.btncontianer1}>
          <Text style={styles.btn}>Forget Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer2} onPress={Login}>
          <Text style={styles.btn2}>Login</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <Text style={styles.sample}>Don't have an account ? </Text>
          <TouchableOpacity
            style={styles.btnContainer3}
            onPress={() => navigation.goBack('Singup')}>
            <Text style={styles.btn3}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
    backgroundColor: '#ebecef',
    // padding: '10%',
    // justifyContent: 'center',
  },
  bgContainer: {
    width: '100%',
  },
  bg: {
    width: '100%',
    paddingVertical: 80,
  },
  header1: {
    marginTop: '8%',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  inputFeild: {
    // backgroundColor: 'orange',
    // marginTop: '20%',
    width: '100%',
    marginTop: '5%',
  },
  input1: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2,
    width: '100%',
    marginBottom: 20,
    // marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    // height: 40,
    paddingVertical: 10,
  },
  btncontianer1: {
    paddingVertical: 15,
    // backgroundColor: 'orange',
  },
  btn: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  btnContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3d00',
    width: 310,
    // height: 40,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  btn2: {
    fontSize: 22,
    color: 'white',
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer3: {
    // paddingLeft: 5,\
    // alignItems: 'center',
  },
  btn3: {
    color: '#ff3d00',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  sample: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  headerfont1: {
    fontSize: 33,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  headerfont2: {
    fontSize: 15,
  },
});
