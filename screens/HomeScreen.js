import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import {AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const [boards, setBoards] = useState([]);


    // LOG OUT //
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };
    // LOG OUT //

    useEffect(() => {
        const unsubscribe = db.collection("Boards").onSnapshot((snapshot) =>
        setBoards(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
            return unsubscribe;
    }, [])
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
    const enterChat=(id, boardName) => {
        navigation.navigate('Board', {
        id,
        boardName,
    });
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {boards.map(({id, data: { boardName }})=>(
                    <CustomListItem 
                    key={id} 
                    id = {id} 
                    boardName={boardName}
                    enterChat={enterChat}/>
                ))}
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
