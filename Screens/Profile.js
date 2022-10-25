//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Profile = ({navigation}) => {
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
  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.push('LOGIN');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'red'}}>
          خوش آمدید
        </Text>
        <Text style={styles.Viewtext}> {name} !!</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          width: 300,
          alignItems: 'center',
          top: 285,
          height: 50,
          justifyContent: 'center',
        }}
        onPress={removeData}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
          {' '}
          LOG OUT{' '}
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
  },
});

//make this component available to the app
export default Profile;
