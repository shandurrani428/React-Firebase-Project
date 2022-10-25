//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
// create a component
const Home = ({navigation, route}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('Userkey').then(value => {
        if (value != null) {
          setName(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //<Button title="LOG OUT" onPress={removeData} />;

  return (
    <View style={styles.container}>
      <Text style={styles.Viewtext}>Welcome {name} !!</Text>
      <TouchableOpacity
        style={styles.buttView}
        onPress={() => navigation.navigate('ListScreen')}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
          {' '}
          View List{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Viewtext: {
    fontSize: 25,
    backgroundColor: 'powderblue',
    bottom: 300,
    color: 'lightblack',
    fontWeight: 'bold',
  },
  buttView: {
    backgroundColor: 'red',
    width: 300,
    alignItems: 'center',
    top: 300,
    height: 50,
    justifyContent: 'center',
  },
});

//make this component available to the app
export default Home;
