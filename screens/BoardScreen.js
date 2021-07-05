import React, { useLayoutEffect, useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, StatusBar, ScrollView, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons  } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import { db, auth } from '../firebase'
import firebase from 'firebase'
import moment from "moment";

const BoardScreen = ({ navigation, route }) => {
    // type message and send //
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const photoURL = auth.currentUser.photoURL;
    const boardName = route.params.boardName;

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Board",
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle:()=> (
                <View
                style={{
                    flexDirection:'row',
                    alignItems: 'center',
                }}
                >
                    <Avatar 
                        rounded 
                        source={{
                            uri: photoURL || "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",
                        }} 
                    />
                    <Text style={{color:'white', marginLeft: 10, fontWeight: '700'}}>
                        {route.params.boardName}
                    </Text>
                </View>
            ),
            headerLeft: () =>(
                <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
        });

    }, [messages])

    // SEND MESSAGE //
    const sendMessage=() => {
        Keyboard.dismiss();

        db.collection('Boards').doc(boardName).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            dateTime : moment().format('YYYY-MM-DD HH:mm:ss'),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: photoURL,
        })

        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('Boards')
        .doc(boardName)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot=> setMessages (
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
        return unsubscribe;
    }, [messages])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="dark"/>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <ScrollView contentContainerStyle={{
                    paddingTop: 15
                }}>
                    {messages.map(({id, data})=> 
                    data.email === auth.currentUser.email ?(
                            <View key={id} style={styles.receiver}>
                                <Avatar 
                                position='absolute'
                                rounded
                                containerStyle={{
                                    position: 'absolute',
                                    bottom: -15,
                                    right: -5,
                                }}
                                bottom={-15}
                                right={-5}
                                size={30}
                                source={{
                                    uri: data.photoURL,
                                }}
                                />
                                <Text style= {styles.receiverText}>
                                    {data.message}
                                </Text>
                                <Text style= {styles.receiverText}>
                                    {data.displayName}
                                </Text>
                                <Text style= {styles.receiverText}>
                                    {data.dateTime}
                                </Text>
                            </View>
                        ): (
                            <View style= {styles.senders}>
                                <Avatar 
                                position='absolute'
                                containerStyle={{
                                    position: 'absolute',
                                    bottom: -15,
                                    left: -5,
                                }}
                               bottom={-15}
                               left={-5}
                               rounded
                               size={30}
                               source={{
                                   uri: data.photoURL,
                               }}
                                />
                                <Text style= {styles.senderText}>
                                    {data.message}
                                </Text>
                                <Text style= {styles.senderName}>
                                    {data.displayName}
                                </Text>
                                <Text style= {styles.receiverText}>
                                    {data.dateTime}
                                </Text>
                            </View>
                        )
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    onSubmitEditing={sendMessage}
                    placeholder='Say something for friends' 
                    style={styles.textInput}
                    />
                    <TouchableOpacity
                    onPress={sendMessage}
                    activeOpacity={0.5}
                    >
                    <Ionicons name="send" size={24} color="purple"/>
                </TouchableOpacity>
                </View>
            </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default BoardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer:{
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%',
    },

    textInput:{
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        // borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },

    receiver:{
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom:20,
        maxWidth: '80%',
        position:'relative'
    },

    senders: {
        padding: 15,
        backgroundColor: 'purple',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position:'relative'        
    },

    senderName:{
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white',
    },

    senderText:{
        color:'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },
    receiverText:{
        color:'black',
        fontWeight: '500',
        marginLeft: 10,
    },
})
