import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import {AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const boards = [{id:1, boardName:'Cars'}, {id:2, boardName:'Food'}, {id:3, boardName:'Fashion'}, {id:4, boardName:'Games'}];


    // LOG OUT //
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };
    // LOG OUT //


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "MessageBoard",
            headerStyle : {backgroundColor: 'purple'},
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
            <View style={{ marginLeft: 20}}>
                <TouchableOpacity onPress={signOutUser} activeOpacity = {0.5}>
                <Avatar rounded source = {{ uri: auth?.currentUser?.photoURL}} />
                </TouchableOpacity>
            </View>
        ),
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
        boardName,
    });
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            {
                    boards.map(({id, boardName}) => {
                        return <CustomListItem 
                            key={id.toString()}
                            boardName={boardName}
                            enterChat={enterChat}/>
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height: '100%',
    }
})
