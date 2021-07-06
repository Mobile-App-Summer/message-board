import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Avatar,SimpleLineIcons } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const SettingScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const update = () => {
        if (email === '' && password === '') {
            alert('Nothing to update!')
            return;
        }

        if (email !== '') {
            auth.currentUser.updateEmail(email)
            .then(() => alert('Email Updated Successfully'))
            .catch(error => alert(error.message));
        }

        if (password !== '') {
            auth.currentUser.updatePassword(password)
            .then(() => alert('Password Updated Successfully'))
            .catch(error => alert(error.message));
        }
    }
    
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };
    
    return (
        <KeyboardAvoidingView behavior='padding' style ={styles.container}>
            <StatusBar style ="light" />
    
            <View style ={styles.inputContainer}>
                <Text style ={styles.instruction}>Enter Required Changes</Text>
                <Input 
                placeholder="Enter New Email" 
                autoFocus 
                type = 'text'
                value={email}
                onChangeText={(text) => setEmail(text)}  
                />
                <Input 
                placeholder='Enter New Password'
                secureTextEntry 
                type ='text'
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={update}
                />
            </View>
    
            <Button containerStyle = {styles.button} onPress={update} title="Update Settings"/>
            <Button containerStyle = {styles.button} onPress={() => signOutUser()} title="Log Out"/>
            <View style = {{ height: 100}}/>
        </KeyboardAvoidingView>
    );
    }

export default SettingScreen

const styles = StyleSheet.create({
    inputContainer:{
        width: 300,
        marginTop: 10,

    },

    container:{
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    button: {
        width: 200,
        marginTop: 10,
    },
    instruction:{
        fontWeight: '600',
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 10,
        color: '#303030'
    },
})