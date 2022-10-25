//import liraries
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
export default ListScreen = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  const [name, setName] = useState('');
  const [count, setCount] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    /* firestore()
      .collection('ListItem')
      .doc('KMgr1S51XYVnuM2tzpGm')
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
        }
      });*/

    const subscriber = firestore()
      .collection('ListItem')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const handleText = () => {
    /*if (name.length == 0) {
      Alert.alert('enter some data');
    } else if (name.length > 35 || name.length < 40) {
      setShowModal(!showModal);
      console.log('hi');
    } else {
      Alert.alert('Enter Should be Greater!!');
    }*/
    if (name.length == 0) {
      Alert.alert('enter some data');
    } else if (switchValue) {
      setShowModal(!showModal);
      var counting = users.length;
      firestore()
        .collection('ListItem')
        .add({
          Text: name,
          key: counting,
        })
        .then(() => {
          console.log('Data added!');
        });
      setName('');
      setCount('');
    } else {
      const storeData = async name => {
        try {
          const jsonValue = JSON.stringify(name);
          await AsyncStorage.setItem('textstorage', jsonValue);
        } catch (e) {
          // saving error
        }
      };

      setName('');
      setCount('');
      setShowModal(!showModal);
      Alert.alert('Data added in to AsyncStorage!!');
    }
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  /* <FlatList
          data={users}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                flex: 1,
                margin: 2,
                justifyContent: 'center',
                left: 5,
              }}>
              
                <Text>{item.Text}</Text>
                <TouchableOpacity
                  onPress={() => deleteData(item.key)}
                  style={{
                    left: 300,
                    bottom: 25,
                  }}>
                  <Text>Delete</Text>
                </TouchableOpacity>
           
            </View>
          )}
        />*/

  const GetValueFunction = value => {
    setName(value);
    var Value = value.length.toString();
    setCount(Value);
  };

  const deleteData = id => {
    console.log(id);
    firestore()
      .collection('ListItem')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = value => {
    //To handle switch toggle
    setSwitchValue(value);
    //State changes according to switch
  };
  //UI Interface
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{height: 40, bottom: 10}}>
          <Text style={{left: 152, top: 23, fontWeight: 'bold'}}>
            {switchValue ? 'ON' : null}
          </Text>
          <Switch
            style={{right: 168}}
            onValueChange={toggleSwitch}
            value={switchValue}
          />
          <Text style={{left: 212, bottom: 24, fontWeight: 'bold'}}>
            {switchValue ? null : 'OFF'}
          </Text>
        </View>
        <SwipeListView
          data={users}
          ItemSeparatorComponent={ItemSeparatorView}
          key={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                flex: 1,
                justifyContent: 'center',
                padding: 10,
                backgroundColor: 'red',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {item.Text}
              </Text>
            </View>
          )}
          renderHiddenItem={({item}) => (
            <View
              style={[
                styles.rowBack,
                {backgroundColor: 'orange', height: '100%'},
              ]}>
              <TouchableOpacity onPress={() => deleteData(item.key)}>
                <Text style={{top: 15, left: 12, fontWeight: 'bold'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={0}
        />

        <Modal animationType={'slide'} transparent={true} visible={showModal}>
          <View
            style={{
              margin: 10,
              justifyContent: 'center',
              marginTop: 96,
              backgroundColor: 'red',
              borderRadius: 5,
              height: 240,
            }}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: 'white',
                  flexDirction: 'coloum-reverse',
                  height: 47,
                  width: 50,
                  bottom: 48,
                  left: 317,
                }}>
                <TouchableOpacity
                  onPress={() => setShowModal(!showModal)}
                  style={{}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'black',
                      fontFamily: 'sans-serif',
                      bottom: 1,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{bottom: 25}}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 10,
                    margin: 5,
                    width: 300,
                    left: 27,
                    fontSize: 15,
                  }}
                  onChangeText={value => GetValueFunction(value)}
                  placeholder={'Enter Some Text . . .'}
                  placeholderTextColor="#24a0ed"
                  value={name}
                  maxLength={40}
                />
              </View>
              <Text style={{left: 195, color: 'white'}}>
                {' '}
                Total character {count}/40{' '}
              </Text>
            </View>
            <View
              style={{
                width: 300,
                left: 32,
                marginTop: 1,
              }}>
              <Button title={'add me'} onPress={handleText} />
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          flex: 1,
          left: 300,
          marginTop: 600,
          position: 'absolute',
        }}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(!showModal);
          }}
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: 'red',
            flexDirction: 'coloum-reverse',
          }}>
          <Text style={{fontSize: 45, color: 'white', bottom: 2}}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
});

//make this component available to the ap
