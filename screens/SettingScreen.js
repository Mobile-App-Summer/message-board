<<<<<<< HEAD
import React from 'react';
import { View,Text,StyleSheet } from "react-native";

function SettingScreen(){
    return(
        <View>
            <Text>Profile</Text>
        </View>
=======
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View,Text,StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';

// LOG OUT
// PROFILE
// ATTACH SOCIAL MEDIA PROFILES
const SettingScreen = ({navigation}) => {
        // LOG OUT //
        const signOutUser = () => {
            auth.signOut().then(() => {
                navigation.replace('Login');
            });
        };
        // LOG OUT //
    return(
        <View>
                <TouchableOpacity onPress={signOutUser} activeOpacity = {0.5}>
                <Avatar rounded source = {{ uri: auth?.currentUser?.photoURL}} />
                </TouchableOpacity>        
                </View>
>>>>>>> 2c51d432486943446b28d1a6de67f532229d75cb
    )
}

const styles = StyleSheet.create({

})

export default SettingScreen