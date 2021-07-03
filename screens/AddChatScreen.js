import React, {useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle: 'Boards',
        });

    }, [navigation])

    // CREATE CHAT //
    const createChat = async ()=>{
        await db
        .collection('Boards')
        .add({
            boardName: input,
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));
    };

    return (
        <View style = {styles.container}>
            <Input
            placeholder="Enter a Chat name"
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            }
            />
            <Button onPress={createChat} title="create new Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    },
})
