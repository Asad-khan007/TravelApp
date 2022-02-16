import React, {useRef, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Image2 from '../Assets/images/watch.png';
// import avatar from '../Assets/images/rounded.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Dashboard = ({navigation}) => {
  let mounted = useRef(false);
  let user = auth().currentUser;
  // let tasks = firestore().collection('Items').doc(user.uid).collection('tasks');

  // const [updateItems, setUpdateItems] = useState([]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!mounted.current) {
      firestore()
        .collection('Items')
        .doc(user.uid)
        .collection('tasks')
        .onSnapshot(docs => {
          let items = [];
          if (docs)
            docs.forEach(doc => {
              items.push({id: doc.id, ...doc.data()});
              console.log('data was loded success', items);
            });
          setItems(items);
          console.log('your state value', items);
        });
      mounted.current = true;
    }
  }, []);

  const logOut = () => {
    try {
      auth().signOut();
      navigation.navigate('Signin');
      console.log('user logout');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <TouchableOpacity onPress={() => logOut()}>
          <Text style={styles.logoutBtn}>LogOut</Text>
        </TouchableOpacity>
        <View style={styles.bgContainer}>
          <Image source={Image2} resizeMode="contain" style={styles.bg} />
          <Text style={styles.font1}>Welcome Pablo Escobar</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.font10}>Good Afternoon</Text>
        <Image source={Image2} resizeMode="contain" style={styles.watchLog} />
        <Text style={styles.listfont}>Tasks List</Text>
        <View style={styles.dashboardView}>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '2%',
              // justifyContent: 'center',
            }}>
            <Text style={styles.font2}>Daily Tasks</Text>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => navigation.navigate('Createlist')}>
              <Text style={styles.btn}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{flex: 1.5}}
            data={items}
            indicatorStyle={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.container2}>
                <View style={styles.taskItem}></View>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {item.input}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '80%',
    width: '100%',
  },
  taskItem: {
    width: 15,
    height: 15,
    backgroundColor: '#FF8C00',
    margin: 6,
    borderRadius: 10,
    marginRight: '3%',
  },
  header1: {
    alignItems: 'center',
    height: 300,
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
  header2: {
    alignItems: 'center',
  },
  dashboardView: {
    backgroundColor: 'white',
    width: '90%',
    height: 150,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: '5%',
  },
  taskContainer: {
    paddingHorizontal: '30%',
    paddingLeft: '5%',
  },
  point: {
    backgroundColor: 'black',
  },
  listfont: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginRight: '70%',
    marginBottom: 20,
  },
  font2: {
    fontSize: 15,
    color: 'black',
    marginRight: '70%',
    fontWeight: 'bold',
  },
  watchLog: {
    width: 100,
    height: 100,
  },
  font1: {
    color: 'white',
    fontSize: 25,
    marginTop: '8%',
  },
  bgContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: '15%',
  },
  bg: {
    width: '40%',
    height: '60%',
    // borderRadius: 80,
  },
  font10: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '70%',
    paddingTop: 5,
  },
  btnContainer: {
    borderColor: 'orange',
    borderWidth: 2,
    width: '10%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    fontSize: 20,
    color: 'orange',
  },
  logoutBtn: {
    color: '#F92F1B',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: '70%',
    // marginTop: 10,
    // backgroundColor: 'blue',
    // margin: '20%',
  },
});
