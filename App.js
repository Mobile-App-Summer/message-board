import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
// import * as SplashScreen from 'expo-splash-screen';

import { StyleSheet, Text, View, LogBox } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import BoardScreen from './screens/BoardScreen';
const Stack = createStackNavigator();

const globalScreenOptions={
  headerStyle: {backgroundColor: '#2c6BED'},
    headerTitleStyle: { color : "white"},
    headerTintColor: 'white', 
  };

export default function App() {
//   console.ignoredYellowBox = [
//     'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
// ];

// SPLASH SCREEN //


  return (
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName="Home" 
      screenOptions={globalScreenOptions}
      >

        <Stack.Screen options={{
        title: "LOGIN"
        }}name='Login' component ={LoginScreen}/>
        
        <Stack.Screen options={{
        title: "Register"
        }}name='Register' component ={RegisterScreen}/>

        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="AddChat" component={AddChatScreen}/>
        <Stack.Screen name="Board" component={BoardScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
