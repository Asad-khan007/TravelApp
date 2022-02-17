import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Modal,
  Button,
  KeyboardAvoidingView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Createlist = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  let user = auth().currentUser;
  let tasks = firestore().collection('Items').doc(user.uid).collection('tasks');

  const [input, setInput] = useState('');
  let mounted = useRef(false);

  const addItem = async () => {
    if (input.length) {
      try {
        let data = await tasks.add({
          input,
        });
        // console.warn('data', data);
      } catch (error) {
        console.warn(error);
      }
      // let array = [{id: 10, task: input}, ...items];
      // setItems(array);
      setInput('');
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      firestore()
        .collection('Items')
        .doc(user.uid)
        .collection('tasks')
        .onSnapshot(docs => {
          setRefreshing(true);
          let item = [];
          if (docs)
            docs.forEach(doc => {
              item.push({id: doc.id, ...doc.data()});
              console.log("id's", {id: doc.id, ...doc.data()});
              // console.log(selectedItem);
            });
          setItems(item);
          setRefreshing(false);
        });
      mounted.current = true;
    }
  }, []);

  const DeleteItem = async item => {
    let obj = await tasks.doc(item.id).delete();
  };

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const [modalValue, setModalValue] = useState('');

  const object = firestore()
    .collection('Items')
    .doc(user.uid)
    .collection('tasks');

  const UpdateItem = async () => {
    try {
      let obj = await object.doc(selectedItem.id).update({
        input: modalValue,
      });
      console.log(obj);
      setIsModalVisible(false);
    } catch (error) {
      setIsModalVisible(false);
      console.log('error', error);
    }
  };

  const [Refreshing, setRefreshing] = useState(false);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isModalVisible ? '#F0E68C' : '#FFC300',
      }}>
      <Modal
        transparent={true}
        style={styles.modalmainContainer}
        visible={isModalVisible}
        onDismiss={() => setSelectedItem({})}
        animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalFont}>Update your Task's</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={val => setModalValue(val)}
            placeholder={selectedItem.input}
          />
          <View style={styles.modalBtnContainer}>
            <TouchableOpacity
              onPress={UpdateItem}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '5%',
              }}>
              <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bgContainer2}
              onPress={() => {
                setIsModalVisible(false);
                setModalValue('');
              }}>
              <Text style={styles.bg2}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity style={styles.modalBtn} onPress={handleModal}>
            <Text style={styles.modalFont2}>Close</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
      <Text style={styles.lable}>Today's Tasks</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        indicatorStyle={false}
        style={styles.listView}
        renderItem={({item}) => (
          <ScrollView
            refreshControl={<RefreshControl refreshing={Refreshing} />}>
            <TouchableOpacity
              activeOpacity={0.3}
              // onLongPress={() => {
              //   setIsModalVisible(true);
              // }}
              onLongPress={() => {
                setIsModalVisible(true);
                setSelectedItem(item);
              }}
              onPress={() => DeleteItem(item)}
              style={styles.container2}>
              <View style={styles.box}></View>
              <Text style={styles.font1}>{item.input}</Text>
              <View style={styles.circle}></View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
      <View style={styles.bottom}>
        <TextInput
          placeholder="Write a Task"
          style={styles.input}
          placeholderTextColor="gray"
          value={input}
          onChangeText={val => setInput(val)}
        />
        <TouchableOpacity onPress={() => addItem()} style={styles.bgContainer}>
          <Text style={styles.bg}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Createlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    // justifyContent: 'center',
  },
  lable: {
    color: 'black',
    fontSize: 31,
    fontWeight: 'bold',
    paddingRight: '50%',
    marginTop: '15%',
  },
  container2: {
    flex: 1,
    backgroundColor: '#FCF3CF',
    width: '100%',
    borderRadius: 20,
    paddingVertical: '5%',
    marginTop: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // shadowColor: 'black',
  },
  box: {
    backgroundColor: '#FFB04B',
    flex: 1,
    width: 20,
    height: 25,
    borderRadius: 8,
    marginLeft: '5%',
  },
  font1: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '5%',
    flex: 8.5,
  },
  circle: {
    flex: 0.5,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 10,
    marginRight: '5%',
    // paddingLeft: '20%',
    // marginLeft: '50%',
  },
  listView: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'black',
    marginTop: '5%',
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: '5%',
  },
  input: {
    borderRadius: 10,
    backgroundColor: 'lightgray',
    width: '70%',
    height: 60,
    // textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
    borderColor: 'white',
    borderWidth: 5,
    // paddingVertical: '5%',
  },
  bgContainer: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    color: 'silver',
    fontSize: 45,
    textAlign: 'center',
    alignItems: 'center',
  },
  modalmainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
    marginHorizontal: '10%',
    borderRadius: 20,
    marginVertical: '20%',
    height: 250,
    // marginBottom: '50%',
  },
  modalFont: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  modalInput: {
    backgroundColor: 'lightgray',
    borderWidth: 5,
    borderColor: 'white',
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 22,
    fontSize: 18,
    // justifyContent: 'center',
    // marginBottom: 10,
  },
  modalBtn: {
    backgroundColor: 'blue',
    width: '100',
  },
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30%',
    marginTop: 15,
    // flex: 1,
  },
  bgContainer2: {
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: '5%',
    // backgroundColor: 'black',
    // margin: '5%',
  },
  bg2: {
    color: 'black',
    fontSize: 18,
  },
});
