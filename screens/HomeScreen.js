import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Pressable, Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import {AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const boards = ["Cars", "Fashion", "Food", "Games"];


    // LOG OUT //
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };
    // LOG OUT //

    useLayoutEffect(() => {
        navigation.setOptions({
            // title: "MessageBoard",
            headerStyle : {backgroundColor: 'purple'},
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
        headerRight: () => (
            
            <View 
            style= {{
                flexDirection:'row',
                justifyContent: 'space-between',
                width:80,
                marginRight: 20,
            }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <SimpleLineIcons 
                    onPress={()=> navigation.navigate("AddChat")}
                    name="pencil" 
                    size={24} 
                    color='black'/>
                </TouchableOpacity>

            </View>
        ),
        });
    }, [navigation]);

    //CHAT //
    const enterChat=(boardName) => {
        navigation.navigate('Board', {
        boardName
    });
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            <Button style = {styles.button} title="Open drawer" onPress={() => navigation.openDrawer()} />
                {boards.map((boardName)=>(
                    <CustomListItem 
                    key={boardName} 
                    boardName={boardName}
                    enterChat={enterChat}/>
                ))}

            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.textStyle}>Profile</Text>
              </Pressable>
              <Button style = {styles.button} title="Open drawer" onPress={() => navigation.openDrawer()} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },
    button:{

    }
})
