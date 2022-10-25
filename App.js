//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Home from './Screens/Home';
import ListScreen from './Screens/ListScreen';
import Profile from './Screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
// create a component

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  return (
    <NavigationContainer
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerTitle: false,
      }}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LOGIN"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={({navigation}) => ({
            title: 'Back',
            headerStyle: {
              backgroundColor: 'white',
            },

            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Text
                onPress={() => navigation.navigate('Profile')}
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  bottom: 1,
                }}>
                {' '}
                Profile{' '}
              </Text>
            ),
          })}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
