import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitButton = () => {
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    alert('successful');
    navigation.push('LOGIN');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/newyork.jpg')}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image style={styles.image} source={require('../Assets/logo.png')} />

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email address"
            placeholderTextColor="white"
            onChangeText={email => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            placeholderTextColor="white"
            onChangeText={password => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text
            style={{color: 'white', fontSize: 25}}
            onPress={handleSubmitButton}>
            Register
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    marginBottom: 140,
    height: 100,
    width: 100,
    marginTop: 20,
  },

  inputView: {
    backgroundColor: '#f5ce0c',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    backgroundColor: '#0006',
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#f5ce0c',
  },
});
