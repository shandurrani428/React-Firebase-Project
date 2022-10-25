//import liraries
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
// create a component
const LoginScreen = ({navigation}) => {
  const [users, setUsers] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  useEffect(() => {
    getData();
    
  
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('Userkey').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    //Check for the email/password TextInput
    //setLoading(true);
    if (users.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      setLoading(true)
      auth()
        .signInWithEmailAndPassword(users, password)
        .then(() => {
          console.log('User account created & signed in!');
          AsyncStorage.setItem('Userkey', users);
          setLoading(false);
          setErrortext('successful!!');
          setUsers('');
          setPassword('');
          navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/invalid-email') {
             setLoading(false);
             setErrortext(error.message);
          }
          else if (error.code === 'auth/user-not-found'){
          setLoading(false);
            setErrortext('No User Found');
          }
          else {
            setLoading(false);
            setErrortext('Please check your email id or password');
          }
        });
        /*.catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setLoading(false);
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('Warning!', 'Please write your data Correct.');
          }

          //console.error(error);
        });*/

      /*try {
        await AsyncStorage.setItem('Userkey', users);
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }*/
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../Assets/newyork.jpg')}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}>
          <View style={{backgroundColor: '#0006'}}>
            <View>
              <Image
                source={require('../Assets/logo.png')}
                style={styles.logoImage}
              />
            </View>
            <View>
              {loading ? (
                <ActivityIndicator
                  //visibility of Overlay Loading Spinner

                  //Text with the Spinner
                  //Text style of the Spinner Text
                  size="large"
                  color="#f5ce0c"
                />
              ) : null}
            </View>
            <View>
              <View style={styles.sectionStyle}>
                <Icon name="envelope" size={25} color="#f5ce0c" />
                <TextInput
                  style={{
                    flex: 1,
                    padding: 6,
                    color: 'white',
                    fontSize: 18,
                    backgroundColor: 'transparent',
                    top: 3,
                    fontFamily: 'sans-serif-light',
                  }}
                  placeholder="E-mail address"
                  placeholderTextColor="white"
                  onChangeText={value => setUsers(value)}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.sectionStyle}>
                <Icon name="lock" size={35} color="#f5ce0c" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="white"
                  onChangeText={value => setPassword(value)}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  style={{
                    flex: 1,
                    padding: 8,
                    color: 'white',
                    fontSize: 18,
                    backgroundColor: 'transparent',
                    top: 2,
                    fontFamily: 'sans-serif-light',
                  }}
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}> {errortext} </Text>
              ) : null}
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
              <Text style={styles.loginText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                bottom: 30,
              }}>
              <Text
                style={{
                  color: 'darkgrey',
                  fontSize: 18,
                }}
                onPress={() => alert('UnderProgress !!')}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                margin: 10,
                top: 70,
              }}
            />
            <TouchableOpacity style={styles.textStyle}>
              <Text
                style={styles.text}
                onPress={() => navigation.navigate('Register')}>
                New here ? SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  logoImage: {
    marginBottom: 135,
    height: 110,
    width: 110,
    margin: 20,
    left: 123,
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.1,
    height: 60,
    borderRadius: 2,
    margin: 10,
    padding: 10,
    backgroundColor: '#0006',
    width: '80%',
    left: 35,
  },

  loginBtn: {
    flexDirection: 'row',
    width: '55%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#f5ce0c',
    margin: 40,
    left: 50,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    marginTop: 70,
  },
  text: {
    color: 'darkgrey',
    justifyContent: 'space-between',
    fontSize: 20,
  },
  errorTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
  },
});

export default LoginScreen;
